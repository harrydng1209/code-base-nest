import { IThrowError } from '@/models/interfaces/auth.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(throwError: IThrowError, status: HttpStatus) {
    super(throwError, status);
  }
}
