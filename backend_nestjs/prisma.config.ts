import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',

  datasource: {
    url: env('DATABASE_URL'), // used by Prisma CLI for migrations
  },

  migrations: {
    seed: 'tsx prisma/seed.ts', // optional seed script
  },
});
