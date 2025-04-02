import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    origin: process.env.ORIGIN_BASE_URL || 'http://localhost:3000',
  });

  const config = new DocumentBuilder()
    .setTitle('Codebase')
    .setDescription('Codebase API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Codebase API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 8080;
  console.info(`Application is running on: http://localhost:${port}`);
  console.info(
    `Swagger documentation available at: http://localhost:${port}/swagger`,
  );

  await app.listen(port);
}

bootstrap();
