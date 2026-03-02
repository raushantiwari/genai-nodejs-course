import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from 'src/modules/hello/hello.module';
import { appConfigurationFactories } from './app.config.factory';
import { appConfigValidationSchema, AppEnv } from './app.config.validation';
import { AppConfigService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: appConfigurationFactories,
      validate: (config: Record<string, unknown>): AppEnv =>
        appConfigValidationSchema.parse(config),
    }),
    HelloModule,
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
