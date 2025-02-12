import { render } from '@react-email/components';
import { eq } from 'drizzle-orm';
import { type NextRequest } from 'next/server';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { getUserEmail } from '~/server/clerk/clerkQueries';
import { db } from '~/server/db/db';
import { userSettings } from '~/server/db/schema';
import { sendEmail } from '~/server/email/resend';
import { createAndSaveDailyHoroscope, createAndSaveUserDailyHoroscope } from '~/server/openai/ai';
import { extractDateString } from '~/utils/date.utils';
import { HoroscopeSigns } from '~/utils/values';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.log('Unauthorized request for creating daily horoscopes');
        return new Response('Unauthorized', {
            status: 401
        });
    }

    console.log('CRON:Creating daily horoscopes');

    await createDailyHoroscopes();

    await sendDailyHoroscopeEmails();

    return Response.json({ success: true });
}

function getTomorrowsDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow;
}

async function createDailyHoroscopes() {
    const date = getTomorrowsDate();

    const promises = Object.values(HoroscopeSigns).map(async (sign) => {
        return createAndSaveDailyHoroscope(sign, date);
    });

    await Promise.all(promises);
}

async function sendDailyHoroscopeEmails() {
    const users = await db.select().from(userSettings).where(eq(userSettings.sendEmailAllowed, true));

    const promises = users.map(async (user) => {
        const subject = `Daily Horoscope for ${extractDateString(new Date())}`;
        const email = await getUserEmail(user.userId);

        if (email) {
            const dailyHoroscope = await createAndSaveUserDailyHoroscope(user.userId);
            if (dailyHoroscope) {
                const emailHtml = await render(
                    <DailyHoroscopeEmail name={user.name} dailyHoroscope={dailyHoroscope} />
                );
                await sendEmail(email, subject, emailHtml, user.emailTime);
            } else {
                console.error('No daily horoscope found for user', user.userId);
            }
        } else {
            console.error('No email found for user', user.userId);
        }

        return null;
    });

    console.info(`Sending emails to ${promises.length} users`);

    await Promise.all(promises);

    console.info(`Emails sent to ${promises.length} users`);
}
