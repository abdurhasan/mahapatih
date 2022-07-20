import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix(env.APP_PREFIX);

  await app.listen(env.APP_PORT);

  Logger.debug(
    `[${env.APP_NAME}][${env.APP_ENV}] running on: ${await app.getUrl()}`,
  );
}

bootstrap();
