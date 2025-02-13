import { predictHoroscopeWithAI } from '~/server/openai/ai';
import { userHoroscopeKV } from '~/server/redis/userHoroscopeKV';
import { getPreviousDate } from '~/utils/date.utils';
import { type HoroscopeSignType } from '~/utils/values';
import { findUserSettings } from '../db/queries';
import { getExtraPrompt } from '../openai/ai.utils';

export async function makeUserHoroscope(userId: string) {
    console.log(`Creating and saving user daily horoscope for ${userId}`);

    const userSettings = await findUserSettings(userId);
    if (!userSettings) {
        console.error('User settings not found');
        return null;
    }

    if (!userSettings.sign) {
        console.error('User sign not found');
        return null;
    }

    const today = new Date();

    const previousHoroscope = await userHoroscopeKV.get(userId, getPreviousDate(today));

    const data = await predictHoroscopeWithAI(
        userSettings.sign as HoroscopeSignType,
        today,
        getExtraPrompt(previousHoroscope)
    );

    if (data) {
        await userHoroscopeKV.set(userId, data);
    } else {
        console.error('Invalid data from AI');
    }
    return data;
}
