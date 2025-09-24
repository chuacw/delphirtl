[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / toFormat

# Function: toFormat()

> **toFormat**(`format`, `d`): `string`

Returns a string for the date in the given format\
     'YYYY': Full year (e.g., 2024)\
     'YY':   Last two digits of year (e.g., 24)\
     'MMMM': January to December\
     'MMM':  Jan to Dec\
     'MM':   Month with leading zero (e.g., 01 - 12)\
     'M':    Month without leading zero (e.g., 1 - 12)\
     'DD':   Day with leading zero (e.g., 01 - 31)\
     'D':    Day without leading zero (e.g., 1 - 31)\
     'HH':   Hour in 24-hour format with leading zero (e.g., 00 - 23)\
     'H':    Hour in 24-hour format without leading zero (e.g., 0 - 23)\
     'hh':   Hour in 12-hour format with leading zero (e.g., 01 - 12)\
     'h':    Hour in 12-hour format without leading zero (e.g., 1 - 12)\
     'nn':   Minute with leading zero (e.g., 00 - 59)\
     'n':    Minute without leading zero (e.g., 0 - 59)\
     'ss':   Second with leading zero (e.g., 00 - 59)\
     's':    Second without leading zero (e.g., 0 - 59)\

## Parameters

• **format**: `string`

string format

• **d**: `Date`

date instance

## Returns

`string`

## Defined in

[src/dateutils.ts:386](https://github.com/chuacw/delphirtl/blob/01752da42abbae178d000244800240d96a86d86e/src/dateutils.ts#L386)
