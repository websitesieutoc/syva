import {
  format,
  formatISO,
  formatRelative as formatRelativeFn,
} from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'qs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newURLWithSearchParams(baseUrl: string, searchParams: unknown) {
  const queryStr = new URLSearchParams(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams as unknown as any
  ).toString();

  const searchParamsStr = queryStr.length > 0 ? `?${queryStr}` : '';

  return `${baseUrl}${searchParamsStr}`;
}

export { format, formatISO };

export function isTimezoneAwareTimestamp(timestamp: string) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,6}(Z$|[+-]\d{2}:\d{2}$)/.test(
    timestamp
  );
}

export function formatTime(
  timestamp?: string | number | Date | null,
  formatType = 'dd.MM.yyyy'
) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return format(timestamp, formatType);
  }

  return format(new Date(timestamp), formatType);
}

export function formatRelative(timestamp?: string | number | Date | null) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return formatRelativeFn(timestamp, new Date());
  }

  return formatRelativeFn(new Date(timestamp), new Date());
}

// This helper is used for pagination serach params: skip, take
export function paramParser(query?: string | string[] | number | null) {
  if (Array.isArray(query)) {
    throw new Error('We do not use Array of string in query');
  }

  if (typeof query === 'number') {
    return query;
  }

  if (typeof query === 'string' && query.length > 0) {
    const parsed = parseInt(query, 10);

    if (Number.isNaN(parsed)) {
      throw new Error('Query contains invalid characters');
    } else {
      return parsed;
    }
  }

  return undefined;
}

// From 'foo[bar]=baz' to foo: { bar: 'baz' }
export function queryParser<R extends Record<string, unknown>>(
  input?: string | string[] | number | null
): R {
  // Most of time we do not use array of strings
  if (Array.isArray(input) || typeof input === 'number') {
    throw new Error('We dont do that here');
  }

  if (input) {
    return qs.parse(input) as R;
  }

  return {} as R;
}

// From { a: { b: 'c' } } to a[b]=c
export function queryStringify(input?: Record<string, unknown>) {
  if (typeof input === 'object') {
    return qs.stringify(input, { encode: false });
  }

  if (typeof input === 'string') {
    return input;
  }

  return '';
}
