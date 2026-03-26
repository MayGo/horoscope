import { render } from '@react-email/components';
import React from 'react';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { api } from '../../../convex/_generated/api';
import { convex } from '~/server/convex/convexClient';
import { getUserEmail } from '~/server/clerk/clerkQueries';
import { sendEmail } from '~/server/email/resend';
import { createScheduledAt } from '~/server/email/resend.utils';
import { userHoroscopeKV } from '~/server/redis/userHoroscopeKV';
import { extractDateString } from '~/utils/date.utils';
import { HoroscopeSigns } from '~/utils/values';
import { makeGeneralHoroscope } from './business.general';
import { makeUserHoroscope } from './business.user';

export async function generateGeneralHoroscopes() {
    const date = new Date();

    const results = await Promise.allSettled(
        Object.values(HoroscopeSigns).map((sign) => makeGeneralHoroscope(sign, date))
    );

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length > 0) {
        console.error(`Failed to generate ${failed.length} general horoscopes`, failed);
    }
}

export async function generateUserHoroscopes() {
    const allUsers = await convex.query(api.userSettings.getAll, {});

    console.log(`Generating horoscopes for ${allUsers.length} users`);

    const results = await Promise.allSettled(allUsers.map((user) => makeUserHoroscope(user.userId)));

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length > 0) {
        console.error(`Failed to generate ${failed.length} user horoscopes`, failed);
    }

    console.log('Completed user horoscope generation');
}

export async function sendEmailToUsers() {
    const users = await convex.query(api.userSettings.getAllEmailOptedIn, {});

    const today = new Date();
    const subject = `Daily Horoscope for ${extractDateString(today)}`;

    const results = await Promise.allSettled(
        users.map(async (user) => {
            const email = await getUserEmail(user.userId);

            if (!email) {
                console.error(`No email found for user ${user.userId}`);
                return;
            }

            const dailyHoroscope = await userHoroscopeKV.get(user.userId, today);

            if (!dailyHoroscope) {
                console.error(`No daily horoscope found for user ${user.userId}`);
                return;
            }

            const emailHtml = await render(
                React.createElement(DailyHoroscopeEmail, {
                    name: user.name,
                    dailyHoroscope: dailyHoroscope
                })
            );

            const { timezone, emailTime } = user;
            const scheduledAt = createScheduledAt(emailTime, timezone);

            console.log(`Sending email to ${email} (user ${user.userId}), scheduledAt: ${scheduledAt ?? 'now'}`);
            await sendEmail(email, subject, emailHtml, scheduledAt);
        })
    );

    const failed = results.filter((r) => r.status === 'rejected');
    console.info(`Emails: ${results.length - failed.length} sent, ${failed.length} failed`);
    if (failed.length > 0) {
        console.error('Failed emails:', failed);
    }
}
