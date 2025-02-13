import { eq } from 'drizzle-orm';
import { type UserSettingsSchema } from '~/validations/userSettings.validation';
import { db } from './db';
import { userSettings } from './schema';

export async function upsertUserSettings(userId: string, settings: UserSettingsSchema) {
    const existingSettings = (await db.select().from(userSettings).where(eq(userSettings.userId, userId)))[0];

    if (!existingSettings) {
        await db.insert(userSettings).values({
            userId,
            ...settings
        });
    } else {
        await db
            .update(userSettings)
            .set({
                userId,
                ...settings
            })
            .where(eq(userSettings.userId, userId));
    }
}
