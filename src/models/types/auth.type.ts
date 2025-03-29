import { ERROR_CODES } from '@/constants/shared.const';

import { EResponseStatus } from '../enums/auth.enum';

export type TErrorCodes = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface TFailureResponse<D = unknown> {
  error: TThrowError<D>;
  status: EResponseStatus;
}

export type TSuccessResponse<D = unknown, M = unknown> = {
  data: D;
  meta: M;
  status: EResponseStatus;
};

export interface TThrowError<D = unknown> {
  code: TErrorCodes;
  data: D;
  message: string;
}
