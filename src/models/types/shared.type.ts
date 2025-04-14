import { Dayjs } from 'dayjs';

export type TDate = Date | Dayjs | number | string;
export type TObjectBoolean = Record<string, boolean>;
export type TObjectString = Record<string, string>;
export type TObjectUnknown = Record<string, unknown>;
