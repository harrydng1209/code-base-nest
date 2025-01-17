import { BaseHttpException } from '@/exceptions/base-http.exception';
import { EResponseStatus } from '@/models/enums/auth.enum';
import { IFailureResponse, IThrowError } from '@/models/interfaces/auth.interface';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    let throwError: IThrowError = {
      code: 'ERR_500',
      message: exception.message || 'Internal server error',
    };

    if (exception instanceof BaseHttpException) {
      const { code, message } = exception.getResponse() as IThrowError;
      throwError = { code, message };
    }

    const failureResponse: IFailureResponse = {
      error: throwError,
      status: EResponseStatus.Failure,
    };
    response.status(status).json(failureResponse);
  }
}
