import { openai } from '@ai-sdk/openai';
import { auth } from '@clerk/nextjs/server';
import { generateObject } from 'ai';
import { randomUUID } from 'crypto';
import 'server-only';
import { horoscopeResultsSchema } from '~/utils/aiTexts';

const modelName = 'gpt-4o-mini';

export const getHoroscope = async (sign: string, date: string) => {
    const authUser = await auth();
    if (!authUser.userId) {
        throw new Error('User not found');
    }

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
