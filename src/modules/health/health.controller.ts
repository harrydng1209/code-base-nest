import constants from '@/constants';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

const { HEALTH_CHECK } = constants.routeApis;
const { ERR_001 } = constants.shared.ERROR_CODES;
const { OK, SERVICE_UNAVAILABLE } = HttpStatus;

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
    try {
      const data = await this.healthCheckService.check([
        () => this.repository.pingCheck(process.env.DB_DATABASE),
      ]);
      return { data };
    } catch (error) {
      console.error(error);
      const throwError = {
        code: ERR_001,
        data: null,
        message: 'Health check failed',
      };
      throw new BaseHttpException(throwError, SERVICE_UNAVAILABLE);
    }
  }
}
