import { z } from 'zod';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, TimeOfDay } from '~/utils/values';

export const userSettingsSchema = z.object({
    name: z.string().min(2, { message: 'Name/Nickname is required' }),
    emailTime: z.nativeEnum(TimeOfDay).optional(),
    horoscopeAge: z.nativeEnum(HoroscopeAge).optional(),
    horoscopeLength: z.nativeEnum(HoroscopeLength).optional(),
    sign: z.nativeEnum(HoroscopeSigns).optional(),
    countryOfBirth: z.string().optional(),
    dateOfBirth: z.string().optional(),
    timeOfBirth: z.union([z.nativeEnum(TimeOfDay), z.literal('')]).optional(),
    sendEmailAllowed: z.boolean().optional()
});

export type UserSettingsSchema = z.infer<typeof userSettingsSchema>;
