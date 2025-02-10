import { z } from 'zod';
import { HoroscopeSigns } from '~/utils/values';

export const testSettingsSchema = z.object({
    sign: z.nativeEnum(HoroscopeSigns),
    date: z.string().min(1, { message: 'Date is required' })
});

export type TestSettingsSchema = z.infer<typeof testSettingsSchema>;
