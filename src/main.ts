import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    origin: process.env.ORIGIN_BASE_URL || 'http://localhost:3000',
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
