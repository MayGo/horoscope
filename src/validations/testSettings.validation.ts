import { z } from 'zod';
import { HoroscopeSigns } from '~/utils/values';

export const testSettingsSchema = z.object({
    sign: z.union([z.nativeEnum(HoroscopeSigns), z.literal('')]),
    date: z.string().min(1, { message: 'Date is required' })
});

export type TestSettingsSchema = z.infer<typeof testSettingsSchema>;
