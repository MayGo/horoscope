import { predictHoroscopeWithAI } from '~/server/openai/ai';
import { extractDateString, getPreviousDate } from '~/utils/date.utils';
import { type HoroscopeSignType } from '~/utils/values';
import { getExtraPrompt } from '../openai/ai.utils';
import { dailyHoroscopeKV } from '../redis/dailyHoroscopeKV';

export async function makeGeneralHoroscope(sign: HoroscopeSignType, date: Date) {
    console.log(`Creating and saving daily horoscope for ${sign} on ${extractDateString(date)}`);

    const previousHoroscope = await dailyHoroscopeKV.get(sign, getPreviousDate(date));
    const data = await predictHoroscopeWithAI(sign, date, getExtraPrompt(previousHoroscope));

    if (data) {
        await dailyHoroscopeKV.set(sign, date, data);
    } else {
        console.error('Invalid data from AI');
    }
    return data;
}
