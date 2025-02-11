import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import 'server-only';
import { userSettingsSchema } from '~/validations/userSettings.validation';
import { db } from './db';
import { userSettings } from './schema';

export const getMySettings = async () => {
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

export const findUserSettings = async (userId: string) => {
    const settings = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    if (!settings) {
        return null;
    }

    return userSettingsSchema.parse(settings[0]);
};
