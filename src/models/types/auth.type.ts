import constants from '@/constants';

import { EResponseStatus } from '../enums/auth.enum';

export type TErrorCodes =
  (typeof constants.shared.ERROR_CODES)[keyof typeof constants.shared.ERROR_CODES];

export type TSuccessResponse<T = unknown, M = unknown> = {
  data: T;
  meta: M;
  status: EResponseStatus;
};
