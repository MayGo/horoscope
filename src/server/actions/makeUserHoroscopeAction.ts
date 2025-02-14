'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { actionClient } from '../../utils/safe-action';
import { makeUserHoroscope } from '../business/business.user';
import { checkIsAdmin } from '../clerk/clerkQueries';

export const makeUserHoroscopeAction = actionClient
    .metadata({ actionName: 'makeUserHoroscopeAction' })
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

        console.log('Making user horoscope', parsedInput);

        const result = await makeUserHoroscope(authUser.userId);

        if (!result) {
            throw new Error('Failed to generate horoscope');
        }

        return result;
    });
