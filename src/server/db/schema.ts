import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, HoroscopeStyle, TimeOfDay } from '~/utils/values';

export const userSettings = pgTable('user_settings', {
    userId: varchar('user_id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull().default(''),
    timezone: varchar('timezone', { length: 50 }).notNull().default('UTC'),
    emailTime: varchar('email_time', { length: 5 }).notNull().default(TimeOfDay.T00_00),
    horoscopeAge: varchar('horoscope_age', { length: 50 }).notNull().default(HoroscopeAge.Today),
    horoscopeLength: varchar('horoscope_length', { length: 50 }).notNull().default(HoroscopeLength.Short),
    horoscopeStyle: varchar('horoscope_style', { length: 50 }).notNull().default(HoroscopeStyle.Direct),
    sign: varchar('sign', { length: 50 }).notNull().default(HoroscopeSigns.aries),
    countryOfBirth: varchar('country_of_birth', { length: 50 }).notNull().default(''),
    dateOfBirth: varchar('date_of_birth', { length: 10 }).notNull().default(''),
    timeOfBirth: varchar('time_of_birth', { length: 5 }).notNull().default(TimeOfDay.T00_00),
    lifeGoal: varchar('life_goal', { length: 255 }).notNull().default(''),
    isAdmin: boolean('is_admin').notNull().default(false),
    sendEmailAllowed: boolean('send_email_allowed').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});
