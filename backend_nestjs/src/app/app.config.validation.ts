import { z } from 'zod';

export const appConfigValidationSchema = z.object({
  ENVIRONMENT: z.string().default('development'),
  APP_NAME: z.string().default('NestJS Example App'),
  APP_URL: z.string().default('http://localhost:5000'),
  PORT: z.coerce.number().default(3000),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),

  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),

  IS_SWAGGER_ENABLED: z.coerce.boolean().default(true),
  SWAGGER_DESCRIPTION: z.string().default('NestJS example app API'),
  SWAGGER_VERSION: z.string().default('1.5'),
  SWAGGER_PATH: z.string().default('api'),
});

export type AppEnv = z.infer<typeof appConfigValidationSchema>;
