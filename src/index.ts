import { MORE_THAN_TWO, IS_EMPTY, MORE_THAN_ONE } from './constants';
import { isArray, isInRange } from './validate';
import { spliceIntoPosition } from './splice_into_position';

type DayType = 'start_on_month' | 'specific_on_month' | 'last_day_on_month' | 'last_week_on_month' | 'last_select_day_on_month' | 'before' | 'near' | 'day_on_every_month'

interface Option {
  type: 'every' | 'start' | 'specific' | 'between' | DayType,
  list?: number[] | null,
  cron?: string;
}

const defaultOptions: Option = {
  type: 'every',
  list: [],
  cron: '* * * ? * * *',
}

const defaultCron: string = '* * * ? * * *';

export const formatSeconds = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 0, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        isInRange(list[0], 0, 59);
        isInRange(list[1], 1, 60);

        return spliceIntoPosition(cron!, 0, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 0, 59));
        }
        const char = list.length ? list.join(',') : 0;
        return spliceIntoPosition(cron!, 0, char);
      }
    case 'between':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 0, 59));

        return spliceIntoPosition(cron!, 0, list.join('-'));
      } else {
        throw Error(IS_EMPTY);
      }
    default:
      return defaultCron; 
  }
}

export const formatMinutes = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};;

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 1, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        isInRange(list[0], 0, 59);
        isInRange(list[1], 1, 60);

        return spliceIntoPosition(cron!, 1, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 0, 59));
        }
        const char = list.length ? list.join(',') : 0;
        return spliceIntoPosition(cron!, 1, char);
      }
    case 'between':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 0, 59));

        return spliceIntoPosition(cron!, 1, list.join('-'));
      } else {
        throw Error(IS_EMPTY);
      }
    default:
      return defaultCron; 
  }
}

export const formatHours = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};;

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 2, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        isInRange(list[0], 0, 23);
        isInRange(list[1], 1, 24);

        return spliceIntoPosition(cron!, 2, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 0, 23));
        }
        const char = list.length ? list.join(',') : 0;
        return spliceIntoPosition(cron!, 2, char);
      }
    case 'between':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 0, 23));

        return spliceIntoPosition(cron!, 2, list.join('-'));
      } else {
        throw Error(IS_EMPTY);
      }
    default:
      return defaultCron; 
  }
}

export const formatDays = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};;

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

        const char = list.length ? list.join('-') : 1;

        return spliceIntoPosition(spliceIntoPosition(cron!, 3, '?'), 5, char);
      }
    default:
      return defaultCron; 
  }
}

export const formatMonths = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};;

  switch (type) {
    case 'every':
      return spliceIntoPosition(cron!, 4, '*');
    case 'start':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 1, 12));

        return spliceIntoPosition(cron!, 4, list.join('/'));
      } else {
        throw Error(IS_EMPTY);
      }
    case 'specific':
      if (list && isArray(list)) {
        if (list.length) {
          list.forEach((item) => isInRange(item, 1, 12));
        }
        const char = list.length ? list.join(',') : 1;
        return spliceIntoPosition(cron!, 4, char);
      }
    case 'between':
      if (list && isArray(list) && list.length) {
        if (list.length > 2) {
          throw Error(MORE_THAN_TWO);
        }

        list.forEach((item) => isInRange(item, 1, 12));
        return spliceIntoPosition(cron!, 4, list.join('-'));
      } else {
        throw Error(IS_EMPTY);
      }
    default:
      return defaultCron; 
  }
}

export const formatYears = (options: Option = defaultOptions) => {
  const { type, list, cron } = {...defaultOptions, ...options};;

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
}