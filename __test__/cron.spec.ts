import { formatDays, formatHours, formatMinutes, formatSeconds, formatYears, formatMonths } from '../src/index';
import { MORE_THAN_TWO, IS_EMPTY, MORE_THAN_ONE } from '../src/constants';

describe('Seconds', () => {

  let result = '';

  it('every', () => {

    result = formatSeconds({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatSeconds({
      type: 'start',
      list: [20, 40],
    });
    expect(result).toEqual('20/40 * * ? * * *');

  });

  it('start list is empty', () => {

    try {

      formatSeconds({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      result = formatSeconds({
        type: 'start',
        list: [20, 40, 60],
      });
      expect(result).toEqual('20/40 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('start validate first', () => {

    try {

      result = formatSeconds({
        type: 'start',
        list: [-1, 52],
      });
      expect(result).toEqual('-1/40 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('start validate last', () => {

    try {

      result = formatSeconds({
        type: 'start',
        list: [1, -52],
      });
      expect(result).toEqual('1/-52 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 60');

    }

  });

  it('specific', () => {

    result = formatSeconds({
      type: 'specific',
      list: [0, 1, 10, 20, 33, 44],
    });
    expect(result).toEqual('0,1,10,20,33,44 * * ? * * *');

  });

  it('specific list empty', () => {

    result = formatSeconds({
      type: 'specific',
      list: [],
    });

    expect(result).toEqual('0 * * ? * * *');

  });

  it('specific validate', () => {

    try {

      result = formatSeconds({
        type: 'specific',
        list: [-1],
      });
      expect(result).toEqual('-1 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('between', () => {

    result = formatSeconds({
      type: 'between',
      list: [52, 20],
    });

    expect(result).toEqual('52-20 * * ? * * *');

  });

  it('between list is empty', () => {

    try {

      formatSeconds({
        type: 'between',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between length three', () => {

    try {

      formatSeconds({
        type: 'between',
        list: [52, 20, 10],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('between validate first', () => {

    try {

      result = formatSeconds({
        type: 'between',
        list: [-1, 61],
      });
      expect(result).toEqual('-1-61 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('between validate last', () => {

    try {

      result = formatSeconds({
        type: 'between',
        list: [1, 61],
      });
      expect(result).toEqual('1-61 * * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('from every to specific', () => {

    result = formatSeconds({
      type: 'every',
    });
    result = formatSeconds({
      type: 'specific',
      list: [0, 1, 10, 20, 33, 44],
    });
    expect(result).toEqual('0,1,10,20,33,44 * * ? * * *');

  });

});

describe('Minutes', () => {

  let result = '';

  it('every', () => {

    result = formatMinutes({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatMinutes({
      type: 'start',
      list: [12, 32],
    });
    expect(result).toEqual('* 12/32 * ? * * *');

  });

  it('start list is empty', () => {

    try {

      formatMinutes({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      result = formatMinutes({
        type: 'start',
        list: [20, 40, 60],
      });
      expect(result).toEqual('* 20/40/60 * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('start validate first', () => {

    try {

      result = formatMinutes({
        type: 'start',
        list: [-1, 52],
      });
      expect(result).toEqual('* -1/52 * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('start validate last', () => {

    try {

      result = formatMinutes({
        type: 'start',
        list: [1, -52],
      });
      expect(result).toEqual('* 1/-52 * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 60');

    }

  });

  it('specific', () => {

    result = formatMinutes({
      type: 'specific',
      list: [0],
    });
    expect(result).toEqual('* 0 * ? * * *');

  });

  it('specific validate', () => {

    try {

      result = formatMinutes({
        type: 'specific',
        list: [12, 60],
      });
      expect(result).toEqual('* 12,60 * ? * * *');

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('specific list empty', () => {

    result = formatMinutes({
      type: 'specific',
      list: [],
    });

    expect(result).toEqual('* 0 * ? * * *');

  });

  it('between', () => {

    result = formatMinutes({
      type: 'between',
      list: [12, 32],
    });
    expect(result).toEqual('* 12-32 * ? * * *');

  });

  it('between list is empty', () => {

    try {

      formatMinutes({
        type: 'between',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between length three', () => {

    try {

      formatMinutes({
        type: 'between',
        list: [12, 32, 14],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('between validate first', () => {

    try {

      formatMinutes({
        type: 'between',
        list: [61, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('between validate last', () => {

    try {

      formatMinutes({
        type: 'between',
        list: [-1, 61],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 59');

    }

  });

  it('from between to specific', () => {

    result = formatMinutes({
      type: 'between',
      list: [12, 32],
    });
    result = formatMinutes({
      type: 'specific',
      list: [0, 1, 10, 20, 33, 44],
    });
    expect(result).toEqual('* 0,1,10,20,33,44 * ? * * *');

  });

});

describe('Seconds & Minutes', () => {

  let result = '';

  it('between seconds & specific minutes', () => {

    result = formatSeconds({
      type: 'between',
      list: [17, 13],
    });

    result = formatMinutes({
      type: 'specific',
      list: [0, 1],
      cron: result,
    });
    expect(result).toEqual('17-13 0,1 * ? * * *');

  });

});

describe('Hours', () => {

  let result = '';

  it('every', () => {

    result = formatHours({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatHours({
      type: 'start',
      list: [17, 16],
    });
    expect(result).toEqual('* * 17/16 ? * * *');

  });

  it('start list is empty', () => {

    try {

      formatHours({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      formatHours({
        type: 'start',
        list: [17, 18, 23],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('start validate first', () => {

    try {

      formatHours({
        type: 'start',
        list: [24, 24],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 23');

    }

  });

  it('specific', () => {

    result = formatHours({
      type: 'specific',
      list: [1, 14, 23],
    });
    expect(result).toEqual('* * 1,14,23 ? * * *');

  });

  it('specific list empty', () => {

    result = formatHours({
      type: 'specific',
      list: [],
    });

    expect(result).toEqual('* * 0 ? * * *');

  });

  it('specific validate', () => {

    try {

      formatHours({
        type: 'specific',
        list: [1, 14, 25],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 23');

    }

  });

  it('between', () => {

    result = formatHours({
      type: 'between',
      list: [12, 23],
    });
    expect(result).toEqual('* * 12-23 ? * * *');

  });

  it('between list is empty', () => {

    try {

      formatHours({
        type: 'between',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between length three', () => {

    try {

      formatHours({
        type: 'between',
        list: [12, 23, 22],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('between validate first', () => {

    try {

      formatHours({
        type: 'between',
        list: [24, 23],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 23');

    }

  });

  it('between validate last', () => {

    try {

      formatHours({
        type: 'between',
        list: [12, 24],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 0 - 23');

    }

  });

  it('from between to specific', () => {

    result = formatHours({
      type: 'between',
      list: [12, 23],
    });
    result = formatHours({
      type: 'specific',
      list: [1, 14, 23],
    });
    expect(result).toEqual('* * 1,14,23 ? * * *');

  });

});

describe('Days', () => {

  let result = '';

  it('every', () => {

    result = formatDays({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatDays({
      type: 'start',
      list: [2, 7],
    });
    expect(result).toEqual('* * * ? * 2/7 *');

  });

  it('start list is empty', () => {

    try {

      formatDays({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      formatDays({
        type: 'start',
        list: [1, 2, 7],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('start validate first', () => {

    try {

      formatDays({
        type: 'start',
        list: [0, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 7');

    }

  });

  it('start validate last', () => {

    try {

      formatDays({
        type: 'start',
        list: [1, 0],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 7');

    }

  });

  it('startOnMonth', () => {

    result = formatDays({
      type: 'start_on_month',
      list: [9, 8],
    });
    expect(result).toEqual('* * * 9/8 * ? *');

  });

  it('startOnMonth list is empty', () => {

    try {

      formatDays({
        type: 'start_on_month',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('startOnMonth length three', () => {

    try {

      formatDays({
        type: 'start_on_month',
        list: [9, 8, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('startOnMonth validate first', () => {

    try {

      formatDays({
        type: 'start_on_month',
        list: [0, 31],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 31');

    }

  });

  it('startOnMonth validate last', () => {

    try {

      formatDays({
        type: 'start_on_month',
        list: [1, 33],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 31');

    }

  });

  it('specific', () => {

    result = formatDays({
      type: 'specific',
      list: [2, 4, 6],
    });
    expect(result).toEqual('* * * ? * 2,4,6 *');

  });

  it('specific list empty', () => {

    result = formatDays({
      type: 'specific',
      list: [],
    });

    expect(result).toEqual('* * * ? * 1 *');

  });

  it('specific validate', () => {

    try {

      formatDays({
        type: 'specific',
        list: [0, 1, 5],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 7');

    }

  });

  it('specificOnMonth', () => {

    result = formatDays({
      type: 'specific_on_month',
      list: [1, 15, 23, 31],
    });
    expect(result).toEqual('* * * 1,15,23,31 * ? *');

  });

  it('specificOnMonth list empty', () => {

    result = formatDays({
      type: 'specific_on_month',
      list: [],
    });

    expect(result).toEqual('* * * 1 * ? *');

  });

  it('specificOnMonth validate', () => {

    try {

      formatDays({
        type: 'specific_on_month',
        list: [1, 33],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 31');

    }

  });

  it('lastDayOnMonth', () => {

    result = formatDays({
      type: 'last_day_on_month',
    });
    expect(result).toEqual('* * * L * ? *');

  });

  it('lastWeekOnMonth', () => {

    result = formatDays({
      type: 'last_week_on_month',
    });
    expect(result).toEqual('* * * LW * ? *');

  });

  it('lastSelectDayOnMonth', () => {

    result = formatDays({
      type: 'last_select_day_on_month',
      list: [2],
    });
    expect(result).toEqual('* * * ? * 2L *');

  });

  it('lastSelectDayOnMonth list is empty', () => {

    try {

      formatDays({
        type: 'last_select_day_on_month',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('lastSelectDayOnMonth length two', () => {

    try {

      formatDays({
        type: 'last_select_day_on_month',
        list: [2, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_ONE);

    }

  });

  it('lastSelectDayOnMonth validate', () => {

    try {

      formatDays({
        type: 'last_select_day_on_month',
        list: [8],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 7');

    }

  });

  it('before', () => {

    result = formatDays({
      type: 'before',
      list: [15],
    });
    expect(result).toEqual('* * * L-15 * ? *');

  });

  it('before list is empty', () => {

    try {

      formatDays({
        type: 'before',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('before length two', () => {

    try {

      formatDays({
        type: 'before',
        list: [15, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_ONE);

    }

  });

  it('before validate', () => {

    try {

      formatDays({
        type: 'before',
        list: [33],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 31');

    }

  });

  it('near', () => {

    result = formatDays({
      type: 'near',
      list: [11],
    });
    expect(result).toEqual('* * * 11W * ? *');

  });

  it('near list is empty', () => {

    try {

      formatDays({
        type: 'near',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('near length two', () => {

    try {

      formatDays({
        type: 'near',
        list: [12, 11],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_ONE);

    }

  });

  it('near validate', () => {

    try {

      formatDays({
        type: 'near',
        list: [33],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 31');

    }

  });

  it('dayOnEveryMonth', () => {

    result = formatDays({
      type: 'day_on_every_month',
      list: [1, 5],
    });
    expect(result).toEqual('* * * ? * 1#5 *');

  });

  it('dayOnEveryMonth list is empty', () => {

    try {

      formatDays({
        type: 'day_on_every_month',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('dayOnEveryMonth length three', () => {

    try {

      formatDays({
        type: 'day_on_every_month',
        list: [1, 5, 6],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('dayOnEveryMonth validate first', () => {

    try {

      formatDays({
        type: 'day_on_every_month',
        list: [8, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 7');

    }

  });

  it('dayOnEveryMonth validate last', () => {

    try {

      formatDays({
        type: 'day_on_every_month',
        list: [7, 6],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 5');

    }

  });

});

describe('Months', () => {

  let result = '';

  it('every', () => {

    result = formatMonths({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatMonths({
      type: 'start',
      list: [3, 12],
    });
    expect(result).toEqual('* * * ? 3/12 * *');

  });

  it('start list is empty', () => {

    try {

      formatMonths({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      formatMonths({
        type: 'start',
        list: [12, 12, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('start validate first', () => {

    try {

      formatMonths({
        type: 'start',
        list: [13, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 12');

    }

  });

  it('start validate last', () => {

    try {

      formatMonths({
        type: 'start',
        list: [12, 13],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 12');

    }

  });

  it('specific', () => {

    result = formatMonths({
      type: 'specific',
      list: [1, 3, 4],
    });
    expect(result).toEqual('* * * ? 1,3,4 * *');

  });

  it('specific list empty', () => {

    result = formatMonths({
      type: 'specific',
      list: [],
    });

    expect(result).toEqual('* * * ? 1 * *');

  });

  it('specific validate', () => {

    try {

      formatMonths({
        type: 'specific',
        list: [1, 3, 4, 14],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 12');

    }

  });

  it('between', () => {

    result = formatMonths({
      type: 'between',
      list: [12, 1],
    });
    expect(result).toEqual('* * * ? 12-1 * *');

  });

  it('between list is empty', () => {

    try {

      formatMonths({
        type: 'between',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between length three', () => {

    try {

      formatMonths({
        type: 'between',
        list: [12, 1, 3],
      });

    } catch (error) {
      const e = error as Error;
      expect(e.message).toEqual(MORE_THAN_TWO);
    }

  });

  it('between validate first', () => {

    try {

      formatMonths({
        type: 'between',
        list: [13, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 12');

    }

  });

  it('between validate last', () => {

    try {

      formatMonths({
        type: 'between',
        list: [1, 13],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('The range is 1 - 12');

    }

  });

  it('from between to specific', () => {

    result = formatMonths({
      type: 'between',
      list: [12, 1],
    });
    result = formatMonths({
      type: 'specific',
      list: [1, 3, 4],
    });
    expect(result).toEqual('* * * ? 1,3,4 * *');

  });

});

describe('Years', () => {

  let result = '';

  it('every', () => {

    result = formatYears({
      type: 'every',
    });
    expect(result).toEqual('* * * ? * * *');

  });

  it('start', () => {

    result = formatYears({
      type: 'start',
      list: [2021, 1],
    });
    expect(result).toEqual('* * * ? * * 2021/1');

  });

  it('start list is empty', () => {

    try {

      formatYears({
        type: 'start',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('start length three', () => {

    try {

      formatYears({
        type: 'start',
        list: [2021, 2022, 1],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('specific', () => {

    result = formatYears({
      type: 'specific',
      list: [2020, 2021, 2022],
    });
    expect(result).toEqual('* * * ? * * 2020,2021,2022');

  });

  it('specific list empty', () => {

    try {

      result = formatYears({
        type: 'specific',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between', () => {

    result = formatYears({
      type: 'between',
      list: [2022, 2023],
    });
    expect(result).toEqual('* * * ? * * 2022-2023');

  });

  it('between list is empty', () => {

    try {

      formatYears({
        type: 'between',
        list: [],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(IS_EMPTY);

    }

  });

  it('between length three', () => {

    try {

      formatYears({
        type: 'between',
        list: [2011, 2022, 2023],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual(MORE_THAN_TWO);

    }

  });

  it('between start more than end', () => {

    try {

      formatYears({
        type: 'between',
        list: [2023, 2022],
      });

    } catch (error) {
      const e = error as Error;

      expect(e.message).toEqual('start must come before end following normal calendar sequence.');

    }

  });

  it('from between to specific', () => {

    result = formatYears({
      type: 'between',
      list: [2022, 2023],
    });
    result = formatYears({
      type: 'specific',
      list: [2020, 2021, 2022],
    });
    expect(result).toEqual('* * * ? * * 2020,2021,2022');

  });

});

describe('All', () => {


  it('validate result 1', () => {

    let result = formatSeconds({
      type: 'start',
      list: [20, 40],
    });

    result = formatMinutes({
      type: 'specific',
      list: [0, 1],
      cron: result,
    });

    result = formatHours({
      type: 'start',
      list: [23, 1],
      cron: result,
    });

    result = formatDays({
      type: 'day_on_every_month',
      list: [3, 5],
      cron: result,
    });

    result = formatMonths({
      type: 'start',
      list: [12, 12],
      cron: result,
    });

    result = formatYears({
      type: 'start',
      list: [2022, 80],
      cron: result,
    });

    expect(result).toEqual('20/40 0,1 23/1 ? 12/12 3#5 2022/80');

  });

  it('validate result 2', () => {

    let result = formatSeconds({
      type: 'every',
    });

    result = formatMinutes({
      type: 'start',
      list: [0, 1],
      cron: result,
    });

    result = formatHours({
      type: 'specific',
      list: [0, 1, 2, 3],
      cron: result,
    });

    result = formatDays({
      type: 'specific',
      list: [1],
      cron: result,
    });

    result = formatMonths({
      type: 'start',
      list: [12, 12],
      cron: result,
    });

    result = formatYears({
      type: 'between',
      list: [2021, 2022],
      cron: result,
    });

    expect(result).toEqual('* 0/1 0,1,2,3 ? 12/12 1 2021-2022');

  });

});