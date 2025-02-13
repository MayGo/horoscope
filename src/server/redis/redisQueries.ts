import { auth } from '@clerk/nextjs/server';
import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { createAndSaveUserDailyHoroscope } from '../openai/ai';
import { kv } from './redisClient';
import { getDailyHoroscopeKey, getUserDailyHoroscopeKey } from './redisUtils';

export const findDailyHoroscope = async (sign: HoroscopeSignType, date: Date) => {
    const key = getDailyHoroscopeKey(sign, date);
    const horoscope = await kv.get(key);

    return horoscope as HoroscopeResultsSchema;
};

export const findTodaysDailyHoroscope = async (sign: HoroscopeSignType) => {
    return findDailyHoroscope(sign, new Date());
};

export const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const key = getDailyHoroscopeKey(sign, date);
    await kv.set(key, horoscope);
};

export const findUserDailyHoroscope = async (userId: string) => {
    const key = getUserDailyHoroscopeKey(userId);
    const horoscope = await kv.get(key);
    return horoscope as HoroscopeResultsSchema;
};

export const findMyDailyHoroscope = async () => {
    const authUser = await auth();

    if (!authUser.userId) {
        throw new Error('User not authenticated');
    }

    const horoscope = await findUserDailyHoroscope(authUser.userId);

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
    const key = getUserDailyHoroscopeKey(userId);
    await kv.set(key, horoscope);
};
