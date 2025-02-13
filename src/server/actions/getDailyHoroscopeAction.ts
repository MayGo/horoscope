'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../utils/safe-action';
import { dailyHoroscopeKV } from '../redis/dailyHoroscopeKV';

export const getDailyHoroscopeAction = actionClient
    .metadata({ actionName: 'getDailyHoroscopeAction' })
    .schema(testSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput }: { parsedInput: TestSettingsSchema }) => {
        const authUser = await auth();
        if (!authUser.userId) {
            throw new Error('User not authenticated');
        }

        const date = new Date(parsedInput.date);

        if (parsedInput.sign) {
            const result = await dailyHoroscopeKV.get(parsedInput.sign, date);

            if (!result) {
                throw new Error('Failed to find horoscope');
            }

            return result;
        } else {
            throw new Error('Select a sign to search for');
        }
    });
