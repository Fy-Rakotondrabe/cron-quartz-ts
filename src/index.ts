import { MORE_THAN_TWO, IS_EMPTY, MORE_THAN_ONE } from './constants';
import { between, isArray, isInRange, specific, start } from './validate';
import { spliceIntoPosition } from './splice_into_position';

type DayType =
  | 'start_on_month'
  | 'specific_on_month'
  | 'last_day_on_month'
  | 'last_week_on_month'
  | 'last_select_day_on_month'
  | 'before'
  | 'near'
  | 'day_on_every_month';

interface Option {
  type: 'every' | 'start' | 'specific' | 'between' | DayType;
  list?: number[] | null;
  cron?: string;
}

const defaultOptions: Option = {
  type: 'every',
  list: [],
  cron: '* * * ? * * *',
};

const defaultCron: string = '* * * ? * * *';

export const formatSeconds = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 0, '*');
    case 'start':
      return start(
        [
          { min: 0, max: 59 },
          { min: 1, max: 60 },
        ],
        cron!,
        0,
        list,
      );
    case 'specific':
      return specific({ min: 0, max: 59 }, cron!, 0, list);
    case 'between':
      return between({ min: 0, max: 59 }, cron!, 0, list);
    default:
      return defaultCron;
  }
};

export const formatMinutes = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 1, '*');
    case 'start':
      return start(
        [
          { min: 0, max: 59 },
          { min: 1, max: 60 },
        ],
        cron!,
        1,
        list,
      );
    case 'specific':
      return specific({ min: 0, max: 59 }, cron!, 1, list);
    case 'between':
      return between({ min: 0, max: 59 }, cron!, 1, list);
    default:
      return defaultCron;
  }
};

export const formatHours = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 2, '*');
    case 'start':
      return start(
        [
          { min: 0, max: 23 },
          { min: 1, max: 24 },
        ],
        cron!,
        2,
        list,
      );
    case 'specific':
      return specific({ min: 0, max: 23 }, cron!, 2, list);
    case 'between':
      return between({ min: 0, max: 23 }, cron!, 2, list);
    default:
      return defaultCron;
  }
};

export const formatDays = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 1, 7));

        return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'start_on_month':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 1, 31));

        return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 1, 7));
        }

        const char = list.length ? list.join(',') : 1;

        return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, char);
      }
    case 'specific_on_month':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 1, 31));
        }

        const char = list.length ? list.join(',') : 1;

        return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, char);
      }
    case 'last_day_on_month':
      return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, 'L');
    case 'last_week_on_month':
      return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, 'LW');
    case 'last_select_day_on_month':
      if (list && isArray(list) && list.length) {
        if (list.length === 1) {
          isInRange(list[0], 1, 7);

          return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, `${list.pop()}L`);
        } else {
          throw Error(MORE_THAN_ONE);
        }
      } else {
        throw Error(IS_EMPTY);
      }
    case 'before':
      if (list && isArray(list) && list.length) {
        if (list.length === 1) {
          isInRange(list[0], 1, 31);

          return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, `L-${list.pop()}`);
        } else {
          throw Error(MORE_THAN_ONE);
        }
      } else {
        throw Error(IS_EMPTY);
      }
    case 'near':
      if (list && isArray(list) && list.length) {
        if (list.length === 1) {
          isInRange(list[0], 1, 31);

          return spliceIntoPosition(spliceIntoPosition(cron!, 5, '?'), 3, `${list.pop()}W`);
        } else {
          throw Error(MORE_THAN_ONE);
        }
      } else {
        throw Error(IS_EMPTY);
      }
    case 'day_on_every_month':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        isInRange(list[0], 1, 7);
        isInRange(list[1], 1, 5);

        return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, list.join('#'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'between':
      if (list && isArray(list)) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        if (list.length) {
          list.forEach((item) => isInRange(item, 1, 7));
        }

        return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, list.join('-'));
      }
    default:
      return defaultCron;
  }
};

export const formatMonths = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 4, '*');
    case 'start':
      return start([{ min: 1, max: 12 }], cron!, 4, list, true);
    case 'specific':
      return specific({ min: 1, max: 12 }, cron!, 4, list, 1);
    case 'between':
      return between({ min: 1, max: 12 }, cron!, 4, list);
    default:
      return defaultCron;
  }
};

export const formatYears = (options: Option) => {
  const { type, list, cron } = { ...defaultOptions, ...options };

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 6, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        return spliceIntoPosition(cron!, 6, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list) && list.length) {
        return spliceIntoPosition(cron!, 6, list.join(','));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'between':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        if (list[0] > list[1]) {
          throw Error('start must come before end following normal calendar sequence.');
        }

        return spliceIntoPosition(cron!, 6, list.join('-'));
      } else {
        throw Error(IS_EMPTY);
      }
    default:
      return defaultCron;
  }
};
