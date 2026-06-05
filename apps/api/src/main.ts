// NPM Modules
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// Custom Modules
import { AppModule } from './app.module';
import LoggerService from './logger/logger.service';
import DataResponse from './utils/interceptors/DataResponse.interceptor';

/**
 * Origins permitted to call the API with credentials. The local web dev server
 * runs on port 3000; production origins are added here as they come online.
 */
export const corsLinkList: string[] = [
  // localhost - web dev server
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // production
  'https://redclayradio.org'
];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Strip properties not declared on DTOs before they reach handlers.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  // Wrap every successful response in a `{ data }` envelope and log HTTP traffic
  // through the sanitizing logger.
  const logger = app.get(LoggerService);
  app.useGlobalInterceptors(new DataResponse(logger));

  // Version all routes under `/v1`, leaving the root path unprefixed.
  app.setGlobalPrefix('v1', {
    exclude: ['/']
  });

  app.enableCors({
    origin: corsLinkList,
    credentials: true
  });

  await app.listen(process.env.PORT || 4000);
}

void bootstrap();
