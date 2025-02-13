import { extractDateString } from '~/utils/date.utils';
import { capitalize } from '~/utils/string.utils';
import { type HoroscopeSignType } from '~/utils/values';

export const getDailyHoroscopeKey = (sign: HoroscopeSignType, date: Date) => {
    const dateStr = extractDateString(date);
    const key = `horoscope:${dateStr}:${capitalize(sign)}`;
    return key;
};

export const getUserDailyHoroscopeKey = (userId: string, date: Date) => {
    const dateStr = extractDateString(date);
    const key = `user_horoscope:${userId}:${dateStr}`;
    return key;
};
