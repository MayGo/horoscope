import { extractDateString } from '~/utils/date.utils';
import { capitalize } from '~/utils/string.utils';
import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { kv } from './kv';

const HOROSCOPE_TTL = 7 * 60 * 60 * 24; // 7 days

const getDailyHoroscopeKey = (sign: HoroscopeSignType, date: Date) => {
    const dateStr = extractDateString(date);
    const key = `horoscope:${dateStr}:${capitalize(sign)}`;
    return key;
};

const getDailyHoroscope = async (sign: HoroscopeSignType, date: Date) => {
    const key = getDailyHoroscopeKey(sign, date);
    const horoscope = await kv.get(key);

    return horoscope as HoroscopeResultsSchema;
};

const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const key = getDailyHoroscopeKey(sign, date);
    await kv.set(key, horoscope, { ex: HOROSCOPE_TTL });
};

export const dailyHoroscopeKV = {
    get: (sign: HoroscopeSignType, date: Date) => getDailyHoroscope(sign, date),
    set: (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) =>
        saveDailyHoroscope(sign, date, horoscope)
};
