import { ConfigFactory, registerAs } from '@nestjs/config';

export const globalConfig = registerAs('global', () => ({
  environment: process.env.ENVIRONMENT,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: Number(process.env.PORT),
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}));

export const swaggerConfig = registerAs('swagger', () => ({
  isEnabled: process.env.IS_SWAGGER_ENABLED === 'true',
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  path: process.env.SWAGGER_PATH,
}));

// IMPORTANT: typed properly (fixes unsafe assignment)
export const appConfigurationFactories: ConfigFactory[] = [globalConfig, jwtConfig, swaggerConfig];
