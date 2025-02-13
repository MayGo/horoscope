import { extractDateString } from '~/utils/date.utils';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { kv } from './kv';

const HOROSCOPE_TTL = 7 * 60 * 60 * 24; // 7 days

const getUserDailyHoroscopeKey = (userId: string, date: Date) => {
    const dateStr = extractDateString(date);
    const key = `user_horoscope:${userId}:${dateStr}`;
    return key;
};

const getUserDailyHoroscope = async (userId: string, date: Date) => {
    const key = getUserDailyHoroscopeKey(userId, date);
    const horoscope = await kv.get(key);
    return horoscope as HoroscopeResultsSchema;
};

const saveUserDailyHoroscope = async (userId: string, horoscope: HoroscopeResultsSchema) => {
    const today = new Date();
    const key = getUserDailyHoroscopeKey(userId, today);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};

export const userHoroscopeKV = {
    set: (userId: string, horoscope: HoroscopeResultsSchema) => saveUserDailyHoroscope(userId, horoscope),
    get: (userId: string, date: Date) => getUserDailyHoroscope(userId, date)
};
