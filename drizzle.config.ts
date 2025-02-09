import { defineConfig } from 'drizzle-kit';
import { env } from '~/env';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/server/db/schema.ts',
    out: './supabase/migrations',
    dbCredentials: {
        url: env.DATABASE_URL
    }
});
