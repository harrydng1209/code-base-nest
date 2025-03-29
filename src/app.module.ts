import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UserEntity } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UsersModule,
    HealthModule,
    TypeOrmModule.forRoot({
      database: process.env.DB_DATABASE || 'code_base',
      entities: [UserEntity],
      host: process.env.DB_HOST || 'localhost',
      password: process.env.DB_PASSWORD || '112233',
      port: Number(process.env.DB_PORT) || 5432,
      synchronize: true,
      type: 'postgres',
      username: process.env.DB_USERNAME || 'postgres',
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
