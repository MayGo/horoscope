import { type HoroscopeSignType } from '~/utils/values';
import { dailyHoroscopeKV } from './dailyHoroscopeKV';

export const getTodaysDailyHoroscope = async (sign: HoroscopeSignType) => {
    return dailyHoroscopeKV.get(sign, new Date());
};
