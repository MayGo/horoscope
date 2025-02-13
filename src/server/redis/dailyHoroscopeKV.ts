import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { kv } from './redisClient';
import { getDailyHoroscopeKey } from './redisUtils';

const HOROSCOPE_TTL = 7 * 60 * 60 * 24; // 7 days

export const getDailyHoroscope = async (sign: HoroscopeSignType, date: Date) => {
    const key = getDailyHoroscopeKey(sign, date);
    const horoscope = await kv.get(key);

    return horoscope as HoroscopeResultsSchema;
};

export const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const key = getDailyHoroscopeKey(sign, date);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};
