import type { TDate, TObjectUnknown } from '@/models/types/shared.type';

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
import { stringify } from 'qs';

dayjs.extend(utc);

export const cleanQuery = <T>(query: TObjectUnknown): T => {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
  return cleanedQuery as T;
};

export const convertToCamelCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToCamelCase(item)) as T;
  if (data === null || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      if (
        (value as TObjectUnknown).constructor === Object ||
        Array.isArray(value)
      ) {
        newObject[newKey] = convertToCamelCase(value as TObjectUnknown);
        return;
      }
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const convertToSnakeCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToSnakeCase(item)) as T;
  if (!data || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      newObject[newKey] = convertToSnakeCase(value as TObjectUnknown);
      return;
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const formatDateUTC = (date: TDate) => {
  return dayjs(date).utc().toISOString();
};

export const formatQueryString = (
  baseUrl: string,
  query: string | string[] | TObjectUnknown,
): string => {
  if (
    !query ||
    (Array.isArray(query) && query.length === 0) ||
    (typeof query === 'object' && Object.keys(query).length === 0)
  )
    return baseUrl;

  const queryString =
    typeof query === 'string'
      ? query
      : stringify(query, { arrayFormat: 'brackets' });
  return `${baseUrl}?${queryString}`;
};

export const sleep = async (second: number) => {
  return await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, 1000 * second);
  });
};
