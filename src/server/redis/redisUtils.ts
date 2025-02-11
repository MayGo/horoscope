import { extractDateString } from '~/utils/date.utils';
import { type HoroscopeSignType } from '~/utils/values';

export function capitalize(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDailyHoroscopeKey = (sign: HoroscopeSignType, date: Date) => {
    const dateStr = extractDateString(date);
    const key = `horoscope:${dateStr}:${capitalize(sign)}`;
    return key;
};

export const getMyDailyHoroscopeKey = (userId: string) => {
    const key = `user_horoscope:${userId}`;
    return key;
};
