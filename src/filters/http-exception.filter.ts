import { EResponseStatus } from '@/models/enums/shared.enum';
import { IFailureResponse } from '@/models/interfaces/shared.interface';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    const failureResponse: IFailureResponse = {
      error: {
        code: status,
        message: exception.message,
      },
      status: EResponseStatus.Failure,
    };
    response.status(status).json(failureResponse);
  }
}
