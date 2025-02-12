'use server';
import { sendTestEmail } from '~/server/email/resend';

export const submitSendEmail = async () => {
    try {
        await sendTestEmail();

        return { error: null, message: `Email sent successfully` };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
        // Error handling
        return {
            error: true,
            message: 'Failed submission'
        };
    }
};
