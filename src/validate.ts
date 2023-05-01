import { IS_EMPTY, MORE_THAN_TWO } from './constants';
import { spliceIntoPosition } from './splice_into_position';

interface Range {
  min: number;
  max: number;
}

export function isInRange(num: number, min: number, max: number) {
  if (num > max || num < min) {
    throw Error(`The range is ${min} - ${max}`);
  }
}

export function isArray<T>(array: T[]): boolean {
  if (!Array.isArray(array)) {
    throw Error('list type is array');
  }
  return true;
}

export function between(range: Range, cron: string, position: number, list?: number[] | null) {
  if (list && isArray(list) && list.length) {
    if (list.length > 2) {
      throw Error(MORE_THAN_TWO);
    }

    list.forEach((item) => isInRange(item, range.min, range.max));
    return spliceIntoPosition(cron, position, list.join('-'));
  } else {
    throw Error(IS_EMPTY);
  }
}

export function start(
  ranges: Range[],
  cron: string,
  position: number,
  list?: number[] | null,
  validatePerListItem: boolean = false,
): string {
  if (list && isArray(list) && list.length) {
    if (list.length > 2) {
      throw Error(MORE_THAN_TWO);
    }

    if (validatePerListItem && ranges.length === 1) {
      list.forEach((item) => isInRange(item, ranges[0].min, ranges[0].max));
    } else {
      ranges.forEach((range, index) => {
        isInRange(list[index], range.min, range.max);
      });
    }
    return spliceIntoPosition(cron, position, list.join('/'));
  } else {
    throw Error(IS_EMPTY);
  }
}

export function specific(
  range: Range,
  cron: string,
  position: number,
  list?: number[] | null,
  defaultChar: number | string = 0,
): string {
  if (list && isArray(list)) {
    if (list.length) {
      list.forEach((item) => isInRange(item, range.min, range.max));
    }

    const char = list.length ? list.join(',') : defaultChar;
    return spliceIntoPosition(cron, position, char);
  } else {
    throw Error(IS_EMPTY);
  }
}
