import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { kv } from './redisClient';
import { getUserDailyHoroscopeKey } from './redisUtils';

const HOROSCOPE_TTL = 7 * 60 * 60 * 24; // 7 days

export const getUserDailyHoroscope = async (userId: string, date: Date) => {
    const key = getUserDailyHoroscopeKey(userId, date);
    const horoscope = await kv.get(key);
    return horoscope as HoroscopeResultsSchema;
};

export const saveUserDailyHoroscope = async (userId: string, horoscope: HoroscopeResultsSchema) => {
    const today = new Date();
    const key = getUserDailyHoroscopeKey(userId, today);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};
