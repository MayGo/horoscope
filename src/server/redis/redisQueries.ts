import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { kv } from './redisClient';
import { getDailyHoroscopeKey } from './redisUtils';

export const findDailyHoroscope = async (sign: HoroscopeSignType, date: Date) => {
    const key = getDailyHoroscopeKey(sign, date);
    console.log(`Getting daily horoscope for ${key} from redis`);
    const horoscope = await kv.get(key);
    console.log('Retrieved horoscope:', horoscope);
    return horoscope as HoroscopeResultsSchema;
};

export const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const key = getDailyHoroscopeKey(sign, date);
    await kv.set(key, horoscope);
};
