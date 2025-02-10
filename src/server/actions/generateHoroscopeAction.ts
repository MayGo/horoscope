'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../lib/safe-action';
import { createHoroscopeWithAI } from '../ai';

export const generateHoroscopeAction = actionClient
    .metadata({ actionName: 'generateHoroscopeAction' })
    .schema(testSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput }: { parsedInput: TestSettingsSchema }) => {
        const authUser = await auth();
        if (!authUser.userId) {
            throw new Error('User not authenticated');
        }

        const result = await createHoroscopeWithAI(parsedInput.sign, parsedInput.date);

        if (!result) {
            throw new Error('Failed to generate horoscope');
        }

        return result;
    });
