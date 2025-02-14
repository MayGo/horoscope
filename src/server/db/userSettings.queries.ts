import { eq } from 'drizzle-orm';
import { type UserSettingsSchema } from '~/validations/userSettings.validation';
import { db } from './db';
import { userSettings } from './schema';

export async function upsertUserSettings(userId: string, settings: UserSettingsSchema) {
    console.log('Upserting user settings for user:', userId);
    const existingSettings = (await db.select().from(userSettings).where(eq(userSettings.userId, userId)))[0];

    if (!existingSettings) {
        await db.insert(userSettings).values({
            userId,
            ...settings
        });
        console.log('User settings created successfully');
    } else {
        await db
            .update(userSettings)
            .set({
                userId,
                ...settings
            })
            .where(eq(userSettings.userId, userId));
        console.log('User settings updated successfully');
    }
}
