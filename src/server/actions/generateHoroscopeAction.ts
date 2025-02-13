'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { HoroscopeSigns } from '~/utils/values';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../utils/safe-action';
import { makeGeneralHoroscope } from '../business/business.general';

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

        const date = new Date(parsedInput.date);

        if (parsedInput.sign) {
            const result = await makeGeneralHoroscope(parsedInput.sign, date);

            if (!result) {
                throw new Error('Failed to generate horoscope');
            }

            return result;
        } else {
            console.log('Generating horoscopes for all signs');
            const promises = Object.values(HoroscopeSigns).map(async (sign) => {
                return makeGeneralHoroscope(sign, date);
            });

            const results = await Promise.all(promises);

            if (results.length === 0) {
                throw new Error('Failed to generate horoscope');
            }

            const result = results[0];

            if (!result) {
                throw new Error('Failed to generate horoscope');
            }

            return result;
        }
    });
