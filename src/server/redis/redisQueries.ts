import { auth } from '@clerk/nextjs/server';
import { type HoroscopeSignType } from '~/utils/values';
import { createAndSaveUserDailyHoroscope } from '../openai/ai';
import { getDailyHoroscope } from './dailyHoroscopeKV';
import { getUserDailyHoroscope } from './userHoroscopeKV';

export const getTodaysDailyHoroscope = async (sign: HoroscopeSignType) => {
    return getDailyHoroscope(sign, new Date());
};

export const findMyDailyHoroscope = async () => {
    const authUser = await auth();

    if (!authUser.userId) {
        throw new Error('User not authenticated');
    }

    const today = new Date();
    const horoscope = await getUserDailyHoroscope(authUser.userId, today);

    if (!horoscope) {
        // generate the initial horoscope
        const newHoroscope = await createAndSaveUserDailyHoroscope(authUser.userId);

        if (!newHoroscope) {
            console.error('Failed to create and save user daily horoscope');
            return null;
        }

        return newHoroscope;
    }

    return horoscope;
};
