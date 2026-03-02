import type { LogLevel } from '@nestjs/common';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ExceptionsFilter } from './core/filters/exceptions.filter';

import { AppConfigModule } from './app/app.module';
import { AppConfigService } from './app/app.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const minimumLoggerLevels: LogLevel[] = ['log', 'error', 'warn'];

  // Create app without env check first
  const app = await NestFactory.create(AppConfigModule);

  const appConfigService = app.get(AppConfigService);

  // ✅ Configure logger AFTER config is available
  app.useLogger(
    appConfigService.environment === 'production'
      ? minimumLoggerLevels
      : [...minimumLoggerLevels, 'debug', 'verbose'],
  );

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global Filters
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapterHost));

  // Security Middlewares
  app.use(
    helmet({
      contentSecurityPolicy: appConfigService.environment === 'localhost' ? false : undefined,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:4200', 'https://angular-example-app.netlify.app'],
    credentials: true,
  });

  // API Versioning
  const API_VERSION = 'v1';
  app.setGlobalPrefix(API_VERSION);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableShutdownHooks();

  // Rate Limiting
  const ONE_MINUTE = 60 * 1000;
  const CONNECTIONS_LIMIT = 500;

  app.use(
    rateLimit({
      windowMs: ONE_MINUTE,
      limit: CONNECTIONS_LIMIT,
      skip: (request) => request.path.includes('analytics'),
    }),
  );

  app.use(compression());

  // Swagger
  if (appConfigService.isSwaggerEnabled) {
    console.log('Setting up Swagger documentation...');
    const options = new DocumentBuilder()
      .setTitle(appConfigService.name)
      .setDescription(appConfigService.swaggerDescription)
      .setVersion(appConfigService.swaggerVersion)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(appConfigService.swaggerPath, app, document);
  }

  const port = appConfigService.port;

  await app.listen(port);

  logger.log(`Application is listening on port ${port}`);
}

void bootstrap();
