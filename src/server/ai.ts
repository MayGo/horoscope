import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { randomUUID } from 'crypto';
import 'server-only';
import { horoscopeResultsSchema } from '~/utils/aiTexts';

const modelName = 'gpt-4o-mini';

export const createHoroscopeWithAI = async (sign: string, date: string) => {
    const randomStr = randomUUID();
    const result = await generateObject({
        model: openai(modelName, {
            structuredOutputs: true
        }),
        temperature: 1.3,
        schemaName: 'horoscope',
        schemaDescription: 'A horoscope for a user.',
        schema: horoscopeResultsSchema,

        prompt: `${randomStr} ${randomStr} What my horoscope for ${sign} on ${date}? ${randomStr}`
    });

    return result.object;
};
