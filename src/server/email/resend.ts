import { auth } from '@clerk/nextjs/server';
import { render } from '@react-email/components';
import React from 'react';
import { Resend } from 'resend';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { env } from '~/env';
import { getUserEmail } from '../clerk/clerkQueries';
import { findMyDailyHoroscope } from '../redis/redisQueries';

const resend = new Resend(env.RESEND_API_KEY);

const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return {
        hours: hours ?? 0,
        minutes: minutes ?? 0
    };
};

function createScheduledAt(time?: string) {
    // time is in format 14:00
    if (!time) return undefined;

    const { hours, minutes } = parseTime(time);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    if (date < new Date()) {
        console.log('Date is in the past, returning undefined');
        return undefined;
    }

    return date.toISOString();
}

const generateEntityRefId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

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
export const sendEmail = async (to: string, subject: string, html: string, time?: string) => {
    console.log(`Sending email to ${to} at ${createScheduledAt(time) ?? 'now'}`);

    await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: to,
        subject: subject,
        html: html,
        scheduledAt: createScheduledAt(time),
        headers: {
            'X-Entity-Ref-ID': generateEntityRefId()
        }
    });
};
