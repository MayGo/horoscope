import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { randomUUID } from 'crypto';
import 'server-only';
import { extractDateString } from '~/utils/date.utils';
import { horoscopeResultsSchema } from '~/validations/horoscopeResults.validation';
const modelName = 'gpt-4o-mini';

const whatNotToUse = 'Dont use em dashes.';

export const predictHoroscopeWithAI = async (sign: string, date: Date, extraPrompt?: string) => {
    const randomStr = randomUUID();
    const result = await generateObject({
        model: openai(modelName, {
            structuredOutputs: true
        }),
        temperature: 1.3,
        schemaName: 'horoscope',
        schemaDescription: 'A horoscope for a user.',
        schema: horoscopeResultsSchema,

        prompt: `${randomStr} ${randomStr} ${whatNotToUse} What my horoscope for ${sign} on ${extractDateString(date)}? ${randomStr} ${extraPrompt}`
    });

    console.log('Result:', result);
    console.log('Tokens consumed:', result.usage?.totalTokens ?? 'unknown');

    return result.object;
};
