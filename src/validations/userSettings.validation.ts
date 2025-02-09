import { HoroscopeAge, HoroscopeLength, HoroscopeSign, TimeOfDay } from '@prisma/client';
import { z } from 'zod';

export const userSettingsSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    emailTime: z.nativeEnum(TimeOfDay).optional(),
    horoscopeAge: z.nativeEnum(HoroscopeAge).optional(),
    horoscopeLength: z.nativeEnum(HoroscopeLength).optional(),
    sign: z.nativeEnum(HoroscopeSign).optional(),
    countryOfBirth: z.string().optional(),
    dateOfBirth: z.date().optional(),
    timeOfBirth: z.nativeEnum(TimeOfDay).optional()
});

export type UserSettingsSchema = z.infer<typeof userSettingsSchema>;
