import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { randomUUID } from 'crypto';
import 'server-only';
import { horoscopeResultsSchema } from '~/utils/aiTexts';
import { extractDateString } from '~/utils/date.utils';

const modelName = 'gpt-4o-mini';

export const createHoroscopeWithAI = async (sign: string, date: Date) => {
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
