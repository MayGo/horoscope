import { auth } from '@clerk/nextjs/server';
import 'server-only';
import { api } from '../../../convex/_generated/api';
import { userSettingsSchema } from '~/validations/userSettings.validation';
import { convex } from '../convex/convexClient';

export const getMySettings = async () => {
    const authUser = await auth();
    if (!authUser.userId) {
        throw new Error('User not found');
    }

    const settings = await convex.query(api.userSettings.findByUserId, { userId: authUser.userId });
    if (!settings) {
        console.info('User settings not found');
        return null;
    }

    return userSettingsSchema.parse(settings);
};

export const findUserSettings = async (userId: string) => {
    const settings = await convex.query(api.userSettings.findByUserId, { userId });
    if (!settings) return null;

    return userSettingsSchema.parse(settings);
};
