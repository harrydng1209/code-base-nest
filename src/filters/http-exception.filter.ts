import { BaseHttpException } from '@/exceptions/base-http.exception';
import { EResponseStatus } from '@/models/enums/auth.enum';
import { TFailureResponse, TThrowError } from '@/models/types/auth.type';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    let throwError: TThrowError = {
      code: 'ERR_500',
      data: null,
      message: exception.message || 'Internal server error',
    };

    if (exception instanceof BaseHttpException)
      throwError = exception.getResponse() as TThrowError;

    const failureResponse: TFailureResponse = {
      error: throwError,
      status: EResponseStatus.Failure,
    };
    response.status(status).json(failureResponse);
  }
}
