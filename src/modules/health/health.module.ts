import { Module } from '@nestjs/common';
import { TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [TypeOrmHealthIndicator],
})
export class HealthModule {}
