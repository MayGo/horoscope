import { type HoroscopeSignType } from '~/utils/values';

export function capitalize(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDailyHoroscopeKey = (sign: HoroscopeSignType, date: Date) => {
    const dateStr = date.toISOString().split('T')[0] ?? '';
    const key = `horoscope:${dateStr}:${capitalize(sign)}`;
    return key;
};
