import { predictHoroscopeWithAI } from '~/server/openai/ai';
import { userHoroscopeKV } from '~/server/redis/userHoroscopeKV';
import { getPreviousDate } from '~/utils/date.utils';
import { HoroscopeStyle, type HoroscopeSignType } from '~/utils/values';
import type { UserSettingsSchema } from '~/validations/userSettings.validation';
import { findUserSettings } from '../db/queries';
import { getWhatNotDoGenerate } from './business.utils';

const tonePrompts = {
    [HoroscopeStyle.Playful]:
        'Write a daily horoscope in a fun, casual, and humorous tone. Use slang, emojis, and a friendly style. Keep it light but insightful.',
    [HoroscopeStyle.Mystical]:
        'Write a daily horoscope in a poetic and mystical style, using metaphors, symbolism, and a touch of the esoteric. Create a sense of wonder and magic.',
    [HoroscopeStyle.Direct]:
        'Write a daily horoscope in a clear, practical, and no-nonsense tone. Focus on actionable advice without unnecessary fluff.'
};

const getPersonalizationPrompt = (userSettings: UserSettingsSchema) => {
    const personalInfo = [];
    if (userSettings.countryOfBirth) personalInfo.push(`Country of birth: ${userSettings.countryOfBirth}`);
    if (userSettings.dateOfBirth) personalInfo.push(`Date of birth: ${userSettings.dateOfBirth}`);
    if (userSettings.timeOfBirth) personalInfo.push(`Time of birth: ${userSettings.timeOfBirth}`);
    if (userSettings.lifeGoal) personalInfo.push(`Life goal: ${userSettings.lifeGoal}`);
    if (userSettings.horoscopeStyle) personalInfo.push(`Horoscope style: ${tonePrompts[userSettings.horoscopeStyle]}`);
    if (personalInfo.length === 0) {
        return '';
    }

    return `Personalize the horoscope with the following information:${personalInfo.join('\n')}`;
};

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

    const whatNotToDo = getWhatNotDoGenerate(previousHoroscope);

    const personalization = getPersonalizationPrompt(userSettings);

    const data = await predictHoroscopeWithAI(
        userSettings.sign as HoroscopeSignType,
        today,
        `${personalization}\n${whatNotToDo}`
    );

    if (data) {
        await userHoroscopeKV.set(userId, data);
    } else {
        console.error('Invalid data from AI');
    }
    return data;
}
