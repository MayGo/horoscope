import 'server-only';
import { api } from '../../../convex/_generated/api';
import { type UserSettingsSchema } from '~/validations/userSettings.validation';
import { convex } from '../convex/convexClient';

export async function upsertUserSettings(userId: string, settings: UserSettingsSchema) {
    console.log('Upserting user settings for user:', userId);
    await convex.mutation(api.userSettings.upsert, { userId, ...settings });
    console.log('User settings saved successfully');
}

export async function deleteUserSettings(userId: string) {
    console.log('Deleting user settings for user:', userId);
    await convex.mutation(api.userSettings.deleteByUserId, { userId });
    console.log('User settings deleted successfully');
}
