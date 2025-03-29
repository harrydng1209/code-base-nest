import { HEALTH_CHECK } from '@/constants/route-apis.const';
import { ERROR_CODES } from '@/constants/shared.const';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private repository: TypeOrmHealthIndicator,
  ) {}

  @Get(HEALTH_CHECK)
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  async check() {
    try {
      const data = await this.healthCheckService.check([
        () => this.repository.pingCheck(process.env.DB_DATABASE),
      ]);
      return { data };
    } catch (error) {
      console.error(error);
      const throwError = {
        code: ERROR_CODES.ERR_001,
        data: null,
        message: 'Health check failed',
      };
      throw new BaseHttpException(throwError, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
