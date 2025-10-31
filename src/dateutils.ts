import { assert } from "console";
import { ethers } from "ethers";

declare global {
    interface Date {
        ToBlockchainTimestamp(): number;

        /**
         * Adds the given number of seconds to a new instance of Date, with the starting value from this instance
         *
         * @param {number} seconds The number of seconds to add
         * @returns {Date} 
         */
        addSeconds(seconds?: number): Date;

        /**
         * Adds the given number of minutes to a new instance of Date, with the starting value from this instance
         * @param minutes The number of minutes to add
         * @returns {Date}
         */
        addMinutes(minutes?: number): Date;

        /**
         * Adds the given number of hours to a new instance of Date, with the starting value from this instance
         * @param hours The number of hours to add
         * @returns {Date}
         */
        addHours(hours?: number): Date;

        /**
         * 
         * Adds the given number of days to a new instance of Date, with the starting value from this instance
         * @param days The number of days to add
         * @returns {Date}
         */
        addDays(days?: number): Date;

        /**
         * 
         * Adds the given number of weeks to a new instance of Date, with the starting value from this instance
         * @param weeks The number of weeks to add
         * @returns {Date}
         */
        addWeeks(weeks?: number): Date;

        /**
         * 
         * Adds the given number of months (30 days) to a new instance of Date, with the starting value from this instance
         * @param months The number of months (30 days) to add
         * @returns {Date}
         */
        addMonths(months?: number): Date;

        /**
         * 
         * Adds the given number of years (365 days) to a new instance of Date, with the starting value from this instance
         * @param years The number of years (365 days per year) to add
         * @returns {Date}
         */
        addYears(years?: number): Date;

        /**
         * Checks if this date instance is the last day of the month
         *
         * @returns {boolean}
         */
        isLastDayOfMonth(): boolean;

        /**
         * Checks if this date instance is a valid date
         *
         * @returns {boolean}
         */
        isValidDate(): boolean;

        /**
         * Formats this date instance into the given format and returns it\
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
         *
         * @param {string} format
         * @returns {string}
         */
        toFormat(format: string): string;
    }
}

/**
 * Converts the given time into Javascript Date
 * @param time 
 * @returns 
 */
function fromBlockchainTimestamp(time: number): Date {
    const timestamp = time * 1000;
    const result = new global.Date(timestamp);
    return result;
}

Date.prototype.ToBlockchainTimestamp = function(): number {
    const timestamp = this.getTime(); // in seconds
    const result = Math.floor((timestamp) / 1000);
    return result;
}

/**
 * Returns a new instance of Date with the added number of seconds
*/
Date.prototype.addSeconds = function(seconds?: number) {
    const result = new Date(this);
    result.setSeconds(result.getSeconds() + (seconds ?? 1));
    return result;
};

/**
* Returns a new instance of Date with the added number of minutes
*/
Date.prototype.addMinutes = function(minutes?: number) {
    const result = new Date(this);
    result.setMinutes(result.getMinutes() + (minutes ?? 1));
    return result;
};

/**
 * Returns a new instance of Date with the added number of hours
*/
Date.prototype.addHours = function(hours?: number) {
    const result = new Date(this);
    result.setHours(result.getHours() + (hours ?? 1));
    return result;
};

/**
 * Returns a new instance of Date with the added number of days
*/
Date.prototype.addDays = function(days?: number) {
    const result = new Date(this);
    result.setDate(result.getDate() + (days ?? 1));
    return result;
};

/**
 * Returns a new instance of Date with the added number of weeks
*/
Date.prototype.addWeeks = function(weeks?: number) {
    const newDate = new Date(this);
    const result = newDate.addDays((weeks ?? 1) * 7);
    return result;
};

/**
 * Returns a new instance of Date with the added number of months
*/
Date.prototype.addMonths = function(months?: number) {
  const result = new Date(this);          // work on a copy
  const originalDay = result.getDate();

  // avoid month overflow by moving to the 1st, then change month
  result.setDate(1);
  const value = result.getMonth() + (months ?? 1);
  result.setMonth(value);

  // clamp to last day of the target month
  const daysInTarget = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(originalDay, daysInTarget));

  return result;
};

/**
 * Returns a new instance of Date with the added number of years
*/
Date.prototype.addYears = function(years?: number) {
    const result = new Date(this);
    var dt = result.getDate();
    result.setFullYear(result.getFullYear() + (years ?? 1));
    var currDt = result.getDate();
    if (dt !== currDt) {
        result.addDays(-currDt);
    }
    return result;
};

Date.prototype.isLastDayOfMonth = function(): boolean {
    const year = this.getFullYear();
    const month = this.getMonth();
    const day = this.getDate();

    // Create a date for the 0th day of the next month ? gives last day of current month
    const lastDay = new Date(year, month + 1, 0).getDate();

    return day === lastDay;
}

Date.prototype.isValidDate = function(): boolean {
    const result = this instanceof Date && !isNaN(this.valueOf());
    return result;
}

Date.prototype.toFormat = function(format: string) {
    const result = toFormat(format, this);
    return result;
}

/**
 * @param  {Date} date
 * @param  {number} years
 * @returns Date
 */
function JSDateAddYears(date: Date, years: number): Date {
    const result = date.addYears(years);
    return result;
}

function JSDateAddMonths(date: Date, months: number): Date {
    const result = date.addMonths(months);
    return result;
}

function JSDateAddWeeks(date: Date, weeks: number): Date {
    const result = date.addWeeks(weeks);
    return result;
}

/**
 * @param  {Date} time
 * @param  {number} days
 * @returns Date
 */
function JSDateAddDays(time: Date, days: number): Date {
    const result = time.addDays(days);
    return result;
}

/**
 * @param  {Date} time
 * @param  {number} hours
 * @returns Date
 */
function JSDateAddHours(time: Date, hours: number): Date {
    const result = time.addHours(hours);
    return result;
}

/**
 * @param  {Date} time
 * @param  {number} mins
 * @returns Date
 */
function JSDateAddMins(time: Date, mins: number): Date {
    const result = time.addMinutes(mins);
    return result;
}

function JSDateAddSecs(time: Date, secs: number): Date {
    const result = time.addSeconds(secs);
    return result;
}

// Converts Javascript date/time to Blockchain date/time, converting to UTC as well.
/**
 * @param  {number|Date} time
 * @returns number
 */
function JSDateToBlockchainTimestamp(time: number | Date): number {
    let timestamp;
    if (time instanceof global.Date) {
        // adjust to UTC
        let tzoffsetHours = time.getTimezoneOffset();
        timestamp = time.getTime(); // in seconds
    } else {
        // assume already in UTC
        timestamp = time;
    }
    const result = Math.floor((timestamp) / 1000);
    return result;
}

/**
 * @param  {number} time
 * @returns number
 */
function JSTimeToUTC(time: number): number {
    return time;
}

function getEstimatedBlockNumberForDuration(Block1: ethers.providers.Block, Block2: ethers.providers.Block, timestampInMS: number): number {
    const diffBlockNumber = Math.abs(Block1.number - Block2.number);
    const diffTimestamp = Math.abs(Block1.timestamp - Block2.timestamp) * 1000;
    const result = timestampInMS / (diffTimestamp / diffBlockNumber);
    return result;
}

/**
 * The difference / duration between 2 dates
 */
export interface TDiffDuration {
    /**
     * 365 days in a year
     */
    years: number

    /**
     * 30 days in a month
     */
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
}

/**
 * Calculates the difference between 2 dates
 * @param d1 
 * @param d2 
 * @returns 
 */
function DiffDuration(d1: Date, d2: Date): TDiffDuration {
    const msDiff = Math.abs(d1.getTime() - d2.getTime());

    const totalSeconds = Math.floor(msDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    let years = Math.floor(totalDays / 365);
    let remainingDays = totalDays % 365;

    let months = Math.floor(remainingDays / 30);
    remainingDays = remainingDays % 30;

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return { years, months, days: remainingDays, hours, minutes, seconds };
}

/**
 * Checks if the given date is the last day of the month
 */
function isLastDayOfMonth(date: Date): boolean {
    const result = date.isLastDayOfMonth();
    return result;
}

/**
 * Checks if a date is valid
 *
 * @param {Date} date
 * @returns {boolean}
 */
function isValidDate(date: Date): boolean {
    const result = date.isValidDate();
    return result;
}

/**
 * Returns a string for the date in the given format\
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
 *
 *
 * @param {Date} d date instance
 * @param {string} format string format
 * @returns {string}
 */
function toFormat(format: string, d: Date): string {
    assert(d.isValidDate(), 'date instance is invalid!');
    const padZero = (value: number, length: number) => String(value).padStart(length, '0');

    const hour = d.getHours();
    const isPM = hour >= 12;

    const monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const replacements: { [key: string]: string } = {
        'YYYY': d.getFullYear().toString(),                  // Full year (e.g., 2024)
        'YY': d.getFullYear().toString().slice(-2),          // Last two digits of year (e.g., 24)
        'MMMM': monthsFull[d.getMonth()],                    // Full month name (e.g., January - December)
        'MMM': monthsAbbr[d.getMonth()],                     // Abbreviated month name (e.g., Jan - Dec)
        'MM': padZero(d.getMonth() + 1, 2),                  // Month with leading zero (e.g., 01 - 12)
        'M': (d.getMonth() + 1).toString(),                  // Month without leading zero (e.g., 1 - 12)
        'DD': padZero(d.getDate(), 2),                       // Day with leading zero (e.g., 01 - 31)
        'D': d.getDate().toString(),                         // Day without leading zero (e.g., 1 - 31)
        'HH': padZero(hour, 2),                              // 24-hour format with leading zero (e.g., 00 - 23)
        'H': hour.toString(),                                // 24-hour format without leading zero (e.g., 0 - 23)
        'hh': padZero(hour % 12 || 12, 2),                   // 12-hour format with leading zero (e.g., 01 - 12)
        'h': (hour % 12 || 12).toString(),                   // 12-hour format without leading zero (e.g., 1 - 12)
        'nn': padZero(d.getMinutes(), 2),                    // Minute with leading zero (e.g., 00 - 59)
        'n': d.getMinutes().toString(),                      // Minute without leading zero (e.g., 0 - 59)
        'ss': padZero(d.getSeconds(), 2),                    // Second with leading zero (e.g., 00 - 59)
        's': d.getSeconds().toString(),                      // Second without leading zero (e.g., 0 - 59)
        'AM': isPM ? 'PM' : 'AM',                            // AM/PM uppercase
        'PM': isPM ? 'PM' : 'AM',                            // AM/PM uppercase
        'am': isPM ? 'pm' : 'am',                            // am/pm lowercase
        'pm': isPM ? 'pm' : 'am'                             // am/pm lowercase
    };

    return format.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|hh|h|nn|n|ss|s|AM|PM|am|pm/g, match => replacements[match]);
}

/**
 * Returns the millisecond of the second
 * @param {Date} date The date to get the milliseconds for
 * @returns {number} Returns the millisecond of the second
 */
function MillisecondOf(date: Date): number {
    return date.getMilliseconds();
}
/**
 * Returns the second of the minute
 * @param {Date} date The date to get the seconds for
 * @returns {number} Returns the second of the minute
 */
function SecondOf(date: Date): number {
    return date.getSeconds();
}
/**
 * Returns the minute of the hour
 * @param {Date} date The date to get the minutes for
 * @returns {number} Returns the minute of the hour
 */
function MinutesOf(date: Date): number {
    return Math.floor(date.getTime() / 60000);
}
/*
 * Returns the hour of the day
 * @param {Date} date The date to get the hours for
 * @returns {number} Returns the hour of the day
 */
function HoursOf(date: Date): number {
    return Math.floor(date.getTime() / 3600000);
}
/**
 * Returns the number of days in the given date
 * @param {Date} date The date to get the days for
 * @returns {number} Returns the number of days
 */
function DaysOf(date: Date): number {
    return Math.floor(date.getTime() / 86400000);
}
/*
 * Returns the minute of the hour
 * @param {Date} date The date to get the minutes for
 * @returns {number} Returns the minute of the hour
 */
function MinuteOf(date: Date): number {
    return date.getMinutes();
}
/*
 * Returns the hour of the day
 * @param {Date} date The date to get the hours for
 * @returns {number} Returns the hour of the day
 */
function HourOf(date: Date): number {
    return date.getHours();
}
/*
 * Returns the day of the month
 * @param {Date} date The date to get the day of the month for
 * @returns {number} Returns the day of the month
 */
function DayOf(date: Date): number {
    return date.getDate();
}
/*
 * Returns the week of the year for the given date
 * @param {Date} date The date to get the week of the year for
 * @returns {number} Returns the week of the year
 */
function WeekOf(date: Date): number {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // Map Sun(0) -> 7, Mon..Sat stay 1..6
    const day = d.getDay() || 7;
    // Nearest Thursday
    d.setDate(d.getDate() + 4 - day);

    const yearStart = new Date(d.getFullYear(), 0, 1);
    const diffDays = Math.floor((d.getTime() - yearStart.getTime()) / 86400000) + 1;

    return Math.ceil(diffDays / 7);
}
/*
 * Returns the month of the year for the given date
 * @param {Date} date The date to get the month of the year for
 * @returns {number} Returns the month of the year
 */
function MonthOf(date: Date): number {
    return date.getMonth()+1;
}
/*
 * Returns the year of the date
 * @param {Date} date The date to get the year for
 * @returns {number} Returns the year
 */
function YearOf(date: Date): number {
    return date.getFullYear();
}

/*
 * Replaces the millisecond of the second
 * @param {Date} date The date to replace the milliseconds for
 * @param {number} millisecond The new millisecond
 * @returns {Date} Returns the new date with the replaced milliseconds
 */
function RecodeMillisecond(date: Date, millisecond: number): Date {
    const result = new Date(date.getTime());
    result.setMilliseconds(millisecond);
    return result;
}
/*
 * Replaces the second of the minute
 * @param {Date} date The date to replace the seconds for
 * @param {number} second The new second
 * @returns {Date} Returns the new date with the replaced seconds
 */
function RecodeSecond(date: Date, second: number): Date {
    const result = new Date(date.getTime());
    result.setSeconds(second);
    return result;
}
/*
 * Replaces the minute of the hour
 * @param {Date} date The date to replace the minutes for
 * @param {number} minute The new minute
 * @returns {Date} Returns the new date with the replaced minutes
 */
function RecodeMinute(date: Date, minute: number): Date {
    const result = new Date(date.getTime());
    result.setMinutes(minute);
    return result;
}
/*
 * Replaces the hour of the day
 * @param {Date} date The date to replace the hours for
 * @param {number} hour The new hour
 * @returns {Date} Returns the new date with the replaced hours
 */
function RecodeHour(date: Date, hour: number): Date {
    const result = new Date(date.getTime());
    result.setHours(hour);
    return result;
}
/*
 * Replaces the day of the month
 * @param {Date} date The date to replace the day for
 * @param {number} day The new day
 * @returns {Date} Returns the new date with the replaced day
 */
function RecodeDay(date: Date, day: number): Date {
    const result = new Date(date.getTime());
    result.setDate(day);
    return result;
}
/*
 * Replaces the month of the year
 * @param {Date} date The date to replace the month for
 * @param {number} month The new month
 * @returns {Date} Returns the new date with the replaced month
 */
function RecodeMonth(date: Date, month: number): Date {
    const result = new Date(date.getTime());
    result.setMonth(month);
    return result;
}
/*
 * Replaces the year of the date
 * @param {Date} date The date to replace the year for
 * @param {number} year The new year
 * @returns {Date} Returns the new date with the replaced year
 */
function RecodeYear(date: Date, year: number): Date {
    const result = new Date(date.getTime());
    result.setFullYear(year);
    return result;
}

export {
    fromBlockchainTimestamp,
    getEstimatedBlockNumberForDuration,
    JSDateAddYears, JSDateAddMonths, JSDateAddWeeks, JSDateAddDays,
    JSDateAddHours, JSDateAddMins, JSDateAddSecs, JSTimeToUTC,
    JSDateToBlockchainTimestamp,
    DiffDuration, isLastDayOfMonth, isValidDate,
    toFormat, toFormat as FormatDateTime,
    MillisecondOf, SecondOf, MinuteOf, HourOf, DayOf, WeekOf, MonthOf, YearOf,
    RecodeMillisecond, RecodeSecond, RecodeMinute, RecodeHour, RecodeDay, RecodeMonth, RecodeYear,
}
