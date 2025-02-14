import { z } from 'zod';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, HoroscopeStyle, TimeOfDay } from '~/utils/values';

export const userSettingsSchema = z.object({
    name: z.string().min(2, { message: 'Name/Nickname is required' }).max(255),
    timezone: z.string().optional(),
    emailTime: z.nativeEnum(TimeOfDay).optional(),
    horoscopeAge: z.nativeEnum(HoroscopeAge).optional(),
    horoscopeLength: z.nativeEnum(HoroscopeLength).optional(),
    horoscopeStyle: z.nativeEnum(HoroscopeStyle).optional(),
    sign: z.nativeEnum(HoroscopeSigns).optional(),
    countryOfBirth: z.string().max(56).optional(),
    dateOfBirth: z.string().optional(),
    timeOfBirth: z.union([z.nativeEnum(TimeOfDay), z.literal('')]).optional(),
    lifeGoal: z.string().max(255).optional(),
    sendEmailAllowed: z.boolean().optional()
});

export type UserSettingsSchema = z.infer<typeof userSettingsSchema>;
