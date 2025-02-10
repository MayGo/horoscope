import { Resend } from 'resend';
import { env } from '~/env';

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

    return date.toISOString();
}

export const sendEmail = async (to: string, subject: string, html: string, time?: string) => {
    await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: to,
        subject: subject,
        html: html,
        scheduledAt: createScheduledAt(time)
    });
};
