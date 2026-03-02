import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from './app.config.validation';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppEnv, true>) {}

  // GLOBAL
  get environment(): string {
    return this.configService.getOrThrow('ENVIRONMENT');
  }

  get name(): string {
    return this.configService.getOrThrow('APP_NAME');
  }

  get url(): string {
    return this.configService.getOrThrow('APP_URL');
  }

  get port(): number {
    return this.configService.getOrThrow('PORT');
  }

  get bcryptSaltRounds(): number {
    return this.configService.getOrThrow('BCRYPT_SALT_ROUNDS');
  }

  // JWT
  get jwtAccessSecret(): string {
    return this.configService.getOrThrow('JWT_ACCESS_SECRET');
  }

  get jwtAccessExpiresIn(): string {
    return this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN');
  }

  get jwtRefreshSecret(): string {
    return this.configService.getOrThrow('JWT_REFRESH_SECRET');
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN');
  }

  // SWAGGER
  get isSwaggerEnabled(): boolean {
    return this.configService.getOrThrow('IS_SWAGGER_ENABLED');
  }

  get swaggerDescription(): string {
    return this.configService.getOrThrow('SWAGGER_DESCRIPTION');
  }

  get swaggerVersion(): string {
    return this.configService.getOrThrow('SWAGGER_VERSION');
  }

  get swaggerPath(): string {
    return this.configService.getOrThrow('SWAGGER_PATH');
  }
}
