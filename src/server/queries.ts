import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import 'server-only';
import { userSettingsSchema } from '~/validations/userSettings.validation';
import { db } from './db/db';
import { userSettings } from './db/schema';

export const getUserSettings = async () => {
    const authUser = await auth();
    if (!authUser.userId) {
        throw new Error('User not found');
    }

    const settings = await db.select().from(userSettings).where(eq(userSettings.userId, authUser.userId));
    if (!settings) {
        throw new Error('User settings not found');
    }

    return userSettingsSchema.parse(settings[0]);
};
