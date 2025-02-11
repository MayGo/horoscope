import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { randomUUID } from 'crypto';
import 'server-only';
import { extractDateString } from '~/utils/date.utils';
import type { HoroscopeSignType } from '~/utils/values';
import { horoscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { findUserSettings } from '../db/queries';
import { saveDailyHoroscope, saveUserDailyHoroscope } from '../redis/redisQueries';

const modelName = 'gpt-4o-mini';

export const createDailyHoroscopeWithAI = async (sign: string, date: Date) => {
    const randomStr = randomUUID();
    const result = await generateObject({
        model: openai(modelName, {
            structuredOutputs: true
        }),
        temperature: 1.3,
        schemaName: 'horoscope',
        schemaDescription: 'A horoscope for a user.',
        schema: horoscopeResultsSchema,

        prompt: `${randomStr} ${randomStr} What my horoscope for ${sign} on ${extractDateString(date)}? ${randomStr}`
    });

    return result.object;
};

export async function createAndSaveDailyHoroscope(sign: HoroscopeSignType, date: Date) {
    console.log(`Creating and saving daily horoscope for ${sign} on ${extractDateString(date)}`);
    const data = await createDailyHoroscopeWithAI(sign, date);
    if (data) {
        await saveDailyHoroscope(sign, date, data);
    } else {
        console.error('Invalid data from AI');
    }
    return data;
}

export async function createAndSaveUserDailyHoroscope(userId: string) {
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
    const data = await createDailyHoroscopeWithAI(userSettings.sign as HoroscopeSignType, today);
    if (data) {
        await saveUserDailyHoroscope(userId, data);
    } else {
        console.error('Invalid data from AI');
    }
    return data;
}
