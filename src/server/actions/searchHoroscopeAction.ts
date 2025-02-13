'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../utils/safe-action';
import { findDailyHoroscope } from '../redis/redisQueries';

export const searchHoroscopeAction = actionClient
    .metadata({ actionName: 'searchHoroscopeAction' })
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
            const result = await findDailyHoroscope(parsedInput.sign, date);

            if (!result) {
                throw new Error('Failed to generate horoscope');
            }

            return result;
        } else {
            throw new Error('Select a sign to search for');
        }
    });
