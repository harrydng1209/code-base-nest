import constants from '@/constants';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

const { HEALTH_CHECK } = constants.routeApis;
const { OK } = constants.shared.HTTP_CODES;

@Controller()
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private repository: TypeOrmHealthIndicator,
  ) {}

  @Get(HEALTH_CHECK)
  @HealthCheck()
  @HttpCode(OK)
  async check() {
    const data = await this.healthCheckService.check([() => this.repository.pingCheck('database')]);
    return { data };
  }
}
