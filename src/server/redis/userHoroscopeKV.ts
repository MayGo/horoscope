import { api } from '../../../convex/_generated/api';
import { extractDateString } from '~/utils/date.utils';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { convex } from '../convex/convexClient';

const getUserDailyHoroscope = async (userId: string, date: Date): Promise<HoroscopeResultsSchema | null> => {
    const dateStr = extractDateString(date);
    return convex.query(api.horoscopes.getUserHoroscope, { userId, date: dateStr });
};

const saveUserDailyHoroscope = async (userId: string, horoscope: HoroscopeResultsSchema) => {
    const today = new Date();
    const dateStr = extractDateString(today);
    await convex.mutation(api.horoscopes.setUserHoroscope, { userId, date: dateStr, horoscope });
};

export const userHoroscopeKV = {
    set: (userId: string, horoscope: HoroscopeResultsSchema) => saveUserDailyHoroscope(userId, horoscope),
    get: (userId: string, date: Date) => getUserDailyHoroscope(userId, date)
};
