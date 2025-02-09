'use server';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { type z } from 'zod';
import { actionClient } from '../lib/safe-action';
import { userSettingsSchema } from '../validations/userSettings.validation';

export const saveUserSettingsAction = actionClient
    .metadata({ actionName: 'saveUserSettingsAction' })
    .schema(userSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput: userSettings }: { parsedInput: z.infer<typeof userSettingsSchema> }) => {
        // Implement the logic to save user settings here
        // For now, just return a success message
        return { message: 'User settings saved successfully' };
    });
