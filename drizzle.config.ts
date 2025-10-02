import { env } from '@/env';

export default {
  schema: './src/db/schema/index.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
  },
};