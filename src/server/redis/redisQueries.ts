import { auth } from '@clerk/nextjs/server';
import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { createAndSaveUserDailyHoroscope } from '../openai/ai';
import { kv } from './redisClient';
import { getDailyHoroscopeKey, getUserDailyHoroscopeKey } from './redisUtils';

const HOROSCOPE_TTL = 7 * 60 * 60 * 24; // 7 days

export const getDailyHoroscope = async (sign: HoroscopeSignType, date: Date) => {
    const key = getDailyHoroscopeKey(sign, date);
    const horoscope = await kv.get(key);

    return horoscope as HoroscopeResultsSchema;
};

export const getTodaysDailyHoroscope = async (sign: HoroscopeSignType) => {
    return getDailyHoroscope(sign, new Date());
};

export const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const key = getDailyHoroscopeKey(sign, date);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};

export const getUserDailyHoroscope = async (userId: string, date: Date) => {
    const key = getUserDailyHoroscopeKey(userId, date);
    const horoscope = await kv.get(key);
    return horoscope as HoroscopeResultsSchema;
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

export const saveUserDailyHoroscope = async (userId: string, horoscope: HoroscopeResultsSchema) => {
    const today = new Date();
    const key = getUserDailyHoroscopeKey(userId, today);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};
