import { type NextRequest } from 'next/server';
import { generateGeneralHoroscopes, generateUserHoroscopes, sendEmailToUsers } from '~/server/business/business';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.log('Unauthorized request for creating daily horoscopes');
        return new Response('Unauthorized', {
            status: 401
        });
    }

    console.log('CRON: Starting daily horoscope generation');

    try {
        await generateGeneralHoroscopes();
        console.log('CRON: General horoscopes completed');
    } catch (error) {
        console.error('CRON: Failed to generate general horoscopes', error);
    }

    try {
        await generateUserHoroscopes();
        console.log('CRON: User horoscopes completed');
    } catch (error) {
        console.error('CRON: Failed to generate user horoscopes', error);
    }

    try {
        await sendEmailToUsers();
        console.log('CRON: Email sending completed');
    } catch (error) {
        console.error('CRON: Failed to send emails', error);
    }

    console.log('CRON: Daily horoscope job finished');
    return Response.json({ success: true });
}
