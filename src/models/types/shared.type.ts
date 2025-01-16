import type { EResponseStatus } from '@/models/enums/shared.enum';

export type TObjectBoolean = Record<string, boolean>;
export type TObjectString = Record<string, string>;
export type TObjectUnknown = Record<string, unknown>;

export type TSuccessResponse<T = unknown, M = unknown> = {
  data: T;
  meta: M;
  status: EResponseStatus;
};
