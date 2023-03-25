import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.PORT);
  
  Logger.debug(
    `[APPS] running on: ${await app.getUrl()}`,
  );

}

bootstrap();
