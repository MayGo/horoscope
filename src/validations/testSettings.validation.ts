import { z } from 'zod';
import { HoroscopeSign } from '~/utils/values';

export const testSettingsSchema = z.object({
    sign: z.nativeEnum(HoroscopeSign),
    date: z.string().min(1, { message: 'Date is required' })
});

export type TestSettingsSchema = z.infer<typeof testSettingsSchema>;
