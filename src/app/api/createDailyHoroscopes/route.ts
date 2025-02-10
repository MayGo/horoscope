import { type NextRequest } from 'next/server';
import { createHoroscopeWithAI } from '~/server/ai';
import { kv } from '~/server/redis/redisClient';
import { HoroscopeSigns, type HoroscopeSignType } from '~/utils/values';

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.log('Unauthorized request for creating daily horoscopes');
        return new Response('Unauthorized', {
            status: 401
        });
    }

    console.log('Creating daily horoscopes');

    await createDailyHoroscopes();

    return Response.json({ success: true });
}

function getTomorrowsDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.toISOString().split('T')[0] ?? ''; // 2025-02-11
}

async function createDailyHoroscopes() {
    const date = getTomorrowsDate();

    const promises = Object.values(HoroscopeSigns).map(async (sign) => {
        return createAndSaveHoroscope(sign, date);
    });

    await Promise.all(promises);
}

async function createAndSaveHoroscope(sign: HoroscopeSignType, date: string) {
    const data = await createHoroscopeWithAI(sign, date);
    if (data) {
        const key = `horoscope:${date}:${sign}`;
        await kv.set(key, data);
    } else {
        console.error('Invalid data from AI');
    }
}
