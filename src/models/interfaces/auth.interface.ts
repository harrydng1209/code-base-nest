import { EResponseStatus } from '../enums/auth.enum';
import { TErrorCodes } from '../types/auth.type';

export interface IFailureResponse {
  error: IThrowError;
  status: EResponseStatus;
}

export interface IThrowError {
  code: TErrorCodes;
  message: string;
}
