import constants from '@/constants';

import { EResponseStatus } from '../enums/auth.enum';

export type TErrorCodes =
  (typeof constants.shared.ERROR_CODES)[keyof typeof constants.shared.ERROR_CODES];

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
