import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
        RESEND_API_KEY: z.string(),
        RESEND_FROM_EMAIL: z.string()
    },

    client: {
        NEXT_PUBLIC_CONVEX_URL: z.string().url()
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
        NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true
});
