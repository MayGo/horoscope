'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../utils/safe-action';
import { checkIsAdmin } from '../clerk/clerkQueries';
import { userHoroscopeKV } from '../redis/userHoroscopeKV';

export const getUserHoroscopeAction = actionClient
    .metadata({ actionName: 'getUserHoroscopeAction' })
    .schema(testSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput }: { parsedInput: TestSettingsSchema }) => {
        const authUser = await auth();
        if (!authUser.userId) {
            throw new Error('User not authenticated');
        }

        if (!(await checkIsAdmin())) {
            throw new Error('User is not an admin');
        }

        const date = new Date(parsedInput.date);

        const result = await userHoroscopeKV.get(authUser.userId, date);

        if (!result) {
            throw new Error('Failed to find horoscope');
        }

        return result;
    });
