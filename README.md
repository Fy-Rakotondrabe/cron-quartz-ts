## cron-quartz-ts

A library that generates `quartz` corresponding cron expressions

TypeScript version of https://github.com/ChestnutChina/cron-quartz
___

## Install

``` bash
npm install cron-quartz-ts
```
___
## Usage

``` typescript
import { formatSeconds } from 'cron-quartz-ts';

// generates an expression for minutes
const result = formatSeconds({
  type: 'specific',
  list: [1, 2, 3],
});

console.log(result) // => '* 1,2,3 * ? * * *'
```
- you can format a pre existing cron expression

``` typescript
import { formatMinutes } from 'cron-quartz-ts';

// generates an expression for minutes
const cron = '1,2,3 * ? * * *';

const result = formatMinutes({
  type: 'specific',
  list: [5],
  cron: cron,
});

console.log(result) // => '* 1,2,3 5 ? * * *'
```
___
## Expression Validate

To validate generated expressions, you can download the `cron-expression-validator` library. For details, see the library documentation.

___

#### `formatSeconds(opts)`

generates an expression for `seconds`

* `opts.type`: there are four types to choose from `every` | `start` | `specific` | `between`
* `opts.list`: Is an array type. Everything except `every` is mandatory

``` typescript
formatSeconds({ type: 'every' }) // => '* * * ? * * *'

formatSeconds({ type: 'start', list: [20, 40]}) // => '20/40 * * ? * * *'

formatSeconds({ type: 'specific', list: [20, 33, 44]}) // => '20,33,44 * * ? * * *'

formatSeconds({ type: 'between', list: [52, 20]}) // => '52-20 * * ? * * *'
```

#### `formatMinutes(opts)`

generates an expression for `minutes`

* `opts.type`: there are four types to choose from `every` | `start` | `specific` | `between`
* `opts.list`: Is an array type. Everything except `every` is mandatory

``` typescript
formatMinutes({ type: 'every' }) // => '* * * ? * * *'

formatMinutes({ type: 'start', list: [12, 32]}) // => '* 12/32 * ? * * *'

formatMinutes({ type: 'specific', list: [0]}) // => '* 0 * ? * * *'

formatMinutes({ type: 'between', list: [12, 32]}) // => '* 12-32 * ? * * *'
```

#### `formatHours(opts)`

generates an expression for `hours`

* `opts.type`: there are four types to choose from `every` | `start` | `specific` | `between`
* `opts.list`: Is an array type. Everything except `every` is mandatory

``` typescript
formatHours({ type: 'every' }) // => '* * * ? * * *'

formatHours({ type: 'start', list: [17, 16]}) // => '* * 17/16 ? * * *'

formatHours({ type: 'specific', list: [1, 14, 23]}) // => '* * 1,14,23 ? * * *'

formatHours({ type: 'between', list: [12, 23]}) // => '* * 12-23 ? * * *'
```

#### `formatDays(opts)`

generates an expression for `days`

* `opts.type`: there are eleven types to choose from `every` | `start` | `startOnMonth` | `specific` | `specificOnMonth` | `lastDayOnMonth` | `lastWeekOnMonth` | `lastSelectDayOnMonth` | `before` | `near` | `dayOnEveryMonth`
* `opts.list`: Is an array type. Everything except `every` | `lastDayOnMonth` | `lastWeekOnMonth` is mandatory

``` typescript
formatDays({ type: 'every' }) // => '* * * ? * * *'

formatDays({ type: 'start', list: [2, 7]}) // => '* * * ? * 2/7 *'

formatDays({ type: 'between', list: [2, 7]}) // => '* * * ? * 2-7 *'

formatDays({ type: 'startOnMonth', list: [9, 8]}) // => '* * * 9/8 * ? *'

formatDays({ type: 'specific', list: [2, 4, 6]}) // => '* * * ? * 2,4,6 *'

formatDays({ type: 'specificOnMonth', list: [1, 15, 23, 31]}) // => '* * * 1,15,23,31 * ? *'

formatDays({ type: 'lastDayOnMonth' }) // => '* * * L * ? *'

formatDays({ type: 'lastWeekOnMonth' }) // => '* * * LW * ? *'

formatDays({ type: 'lastSelectDayOnMonth', list: [2] }) // => '* * * ? * 2L *'

formatDays({ type: 'before', list: [15] }) // => '* * * L-15 * ? *'

formatDays({ type: 'near', list: [11] }) // => '* * * 11W * ? *'

formatDays({ type: 'dayOnEveryMonth', list: [1, 5] }) // => '* * * ? * 1#5 *'
```
#### `formatMonths(opts)`

generates an expression for `months`

* `opts.type`: there are eleven types to choose from `every` | `start` | `specific` | `between`
* `opts.list`: Is an array type. Everything except `every` is mandatory

``` typescript
formatMonths({ type: 'every' }) // => '* * * ? * * *'

formatMonths({ type: 'start', list: [[3, 12]}) // => '* * * ? 3/12 * *'

formatMonths({ type: 'specific', list: [1, 3, 4]}) // => '* * * ? 1,3,4 * *'

formatMonths({ type: 'between', list: [12, 1]}) // => '* * * ? 12-1 * *'
```
#### `formatYears(opts)`

generates an expression for `years`

* `opts.type`: there are eleven types to choose from `every` | `start` | `specific` | `between`
* `opts.list`: Is an array type. Everything except `every` is mandatory

``` typescript
formatYears({ type: 'every' }) // => '* * * ? * * *'

formatYears({ type: 'start', list: [2021, 1]}) // => '* * * ? * * 2021/1'

formatYears({ type: 'specific', list: [2020, 2021, 2022]}) // => '* * * ? * * 2020,2021,2022'

formatYears({ type: 'between', list: [2022, 2023]}) // => '* * * ? * * 2022-2023'
```
