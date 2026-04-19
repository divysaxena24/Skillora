import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local strictly to avoid expo defaults missing it in CLI
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL missing from .env.local');
}

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
