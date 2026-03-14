import { api } from '../../../convex/_generated/api';
import { extractDateString } from '~/utils/date.utils';
import { capitalize } from '~/utils/string.utils';
import { type HoroscopeSignType } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { convex } from '../convex/convexClient';

const getDailyHoroscope = async (sign: HoroscopeSignType, date: Date): Promise<HoroscopeResultsSchema | null> => {
    const dateStr = extractDateString(date);
    return convex.query(api.horoscopes.getGeneralHoroscope, { sign: capitalize(sign), date: dateStr });
};

const saveDailyHoroscope = async (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) => {
    const dateStr = extractDateString(date);
    await convex.mutation(api.horoscopes.setGeneralHoroscope, { sign: capitalize(sign), date: dateStr, horoscope });
};

export const dailyHoroscopeKV = {
    get: (sign: HoroscopeSignType, date: Date) => getDailyHoroscope(sign, date),
    set: (sign: HoroscopeSignType, date: Date, horoscope: HoroscopeResultsSchema) =>
        saveDailyHoroscope(sign, date, horoscope)
};
