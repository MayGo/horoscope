'use server';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { flattenValidationErrors } from 'next-safe-action';
import 'server-only';
import { type z } from 'zod';
import { db } from '~/server/db/db';
import { userSettings } from '~/server/db/schema';
import { actionClient } from '../../lib/safe-action';
import { userSettingsSchema } from '../../validations/userSettings.validation';

export const saveUserSettingsAction = actionClient
    .metadata({ actionName: 'saveUserSettingsAction' })
    .schema(userSettingsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput }: { parsedInput: z.infer<typeof userSettingsSchema> }) => {
        if (parsedInput.name === 'test') {
            throw new Error('Name cannot be test');
        }

        const authUser = await auth();
        if (!authUser.userId) {
            throw new Error('User not authenticated');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const existingSettings = (
            await db.select().from(userSettings).where(eq(userSettings.userId, authUser.userId))
        )[0];

        if (!existingSettings) {
            throw new Error('User settings not found');
        }

        await db
            .update(userSettings)
            .set({
                userId: authUser.userId,
                ...parsedInput
            })
            .where(eq(userSettings.userId, authUser.userId));

        // Implement the logic to save user settings here
        // For now, just return a success message
        return { message: 'User settings saved successfully' };
    });
