'use server';
import { auth } from '@clerk/nextjs/server';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import 'server-only';
import { actionClient } from '../../utils/safe-action';
import { type UserSettingsSchema, userSettingsSchema } from '../../validations/userSettings.validation';
import { upsertUserSettings } from '../db/userSettings.queries';

export const upsertUserSettingsAction = actionClient
    .metadata({ actionName: 'upsertUserSettingsAction' })
    .schema(userSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput }: { parsedInput: UserSettingsSchema }) => {
        if (parsedInput.name === 'test') {
            throw new Error('Name cannot be test');
        }

        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        await upsertUserSettings(userId, parsedInput);

        revalidatePath('/my-horoscope', 'page');
        redirect('/my-horoscope');

        return { message: 'User settings saved successfully' };
    });
