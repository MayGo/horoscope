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

    console.log('CRON:Creating daily horoscopes');

    await generateGeneralHoroscopes();

    await generateUserHoroscopes();

    await sendEmailToUsers();

    return Response.json({ success: true });
}
