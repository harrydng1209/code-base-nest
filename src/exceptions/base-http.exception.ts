import { TThrowError } from '@/models/types/auth.type';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(throwError: TThrowError, status: HttpStatus) {
    super(throwError, status);
  }
}
