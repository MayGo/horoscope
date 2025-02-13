import { render } from '@react-email/components';
import { eq } from 'drizzle-orm';
import React from 'react';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { getUserEmail } from '~/server/clerk/clerkQueries';
import { db } from '~/server/db/db';
import { userSettings } from '~/server/db/schema';
import { sendEmail } from '~/server/email/resend';
import { createScheduledAt } from '~/server/email/resend.utils';
import { createAndSaveDailyHoroscope, createAndSaveUserDailyHoroscope } from '~/server/openai/ai';
import { userHoroscopeKV } from '~/server/redis/userHoroscopeKV';
import { extractDateString, getTomorrowsDate } from '~/utils/date.utils';
import { HoroscopeSigns } from '~/utils/values';

export async function generateGeneralHoroscopes() {
    const date = getTomorrowsDate();

    const promises = Object.values(HoroscopeSigns).map(async (sign) => {
        return createAndSaveDailyHoroscope(sign, date);
    });

    await Promise.all(promises);
}

export async function generateUserHoroscopes() {
    // refactor this if we get more than 1000 users
    const allUsers = await db.select().from(userSettings);

    console.log(`Generating horoscopes for ${allUsers.length} users`);

    await Promise.all(allUsers.map((user) => createAndSaveUserDailyHoroscope(user.userId)));

    console.log('Completed user horoscope generation');
}

export async function sendEmailToUsers() {
    const users = await db.select().from(userSettings).where(eq(userSettings.sendEmailAllowed, true));

    const promises = users.map(async (user) => {
        const subject = `Daily Horoscope for ${extractDateString(new Date())}`;
        const email = await getUserEmail(user.userId);

        if (!email) {
            console.error('No email found for user', user.userId);
            return null;
        }

        const today = new Date();
        const dailyHoroscope = await userHoroscopeKV.get(user.userId, today);

        if (dailyHoroscope) {
            const emailHtml = await render(
                React.createElement(DailyHoroscopeEmail, {
                    name: user.name,
                    dailyHoroscope: dailyHoroscope
                })
            );

            const { timezone, emailTime } = user;

            const scheduledAt = createScheduledAt(emailTime, timezone);

            await sendEmail(email, subject, emailHtml, scheduledAt);
        } else {
            console.error('No daily horoscope found for user', user.userId);
        }

        return null;
    });

    console.info(`Sending emails to ${promises.length} users`);
    await Promise.all(promises);
    console.info(`Emails sent to ${promises.length} users`);
}
