import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { HoroscopeAge, HoroscopeLength, TimeOfDay } from '~/utils/values';

export const userSettings = pgTable('user_settings', {
    userId: varchar('user_id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull().default(''),
    emailTime: varchar('email_time', { length: 5 }).notNull().default(TimeOfDay.T00_00),
    horoscopeAge: varchar('horoscope_age', { length: 255 }).notNull().default(HoroscopeAge.Today),
    horoscopeLength: varchar('horoscope_length', { length: 255 }).notNull().default(HoroscopeLength.Short),
    sign: varchar('sign', { length: 255 }).notNull().default('Aries'),
    countryOfBirth: varchar('country_of_birth', { length: 255 }).notNull().default(''),
    dateOfBirth: varchar('date_of_birth', { length: 255 }).notNull().default(''),
    timeOfBirth: varchar('time_of_birth', { length: 5 }).notNull().default(TimeOfDay.T00_00),
    isAdmin: boolean('is_admin').notNull().default(false),
    sendEmailAllowed: boolean('send_email_allowed').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});
