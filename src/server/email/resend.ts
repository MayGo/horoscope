import { auth } from '@clerk/nextjs/server';
import { render } from '@react-email/components';
import React from 'react';
import { Resend } from 'resend';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { env } from '~/env';
import { getUserEmail } from '../clerk/clerkQueries';
import { findMyDailyHoroscope } from '../redis/redisQueries';
import { generateEntityRefId } from './resend.utils';

const resend = new Resend(env.RESEND_API_KEY);

export const sendTestEmail = async () => {
    const authUser = await auth();
    if (!authUser.userId) {
        throw new Error('User not authenticated');
    }

    const email = await getUserEmail(authUser.userId);
    if (!email) {
        throw new Error('User not authenticated');
    }

    const dailyHoroscope = await findMyDailyHoroscope();
    if (dailyHoroscope) {
        const emailHtml = await render(
            React.createElement(DailyHoroscopeEmail, {
                name: 'John Doe',
                dailyHoroscope: dailyHoroscope
            })
        );

        const subject = `Testing Daily Horoscope`;

        await sendEmail(email, subject, emailHtml);
    } else {
        console.error('No daily horoscope found for user');
    }
};

export const sendEmail = async (to: string, subject: string, html: string, scheduledAt?: string) => {
    console.log(`Sending email to ${to} at ${scheduledAt ?? 'now'}`);

    await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: to,
        subject: subject,
        html: html,
        scheduledAt,
        headers: {
            'X-Entity-Ref-ID': generateEntityRefId()
        }
    });
};
