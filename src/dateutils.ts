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
        addSeconds(seconds: number): Date;

        /**
         * Adds the given number of minutes to a new instance of Date, with the starting value from this instance
         * @param minutes The number of minutes to add
         * @returns {Date}
         */
        addMinutes(minutes: number): Date;

        /**
         * Adds the given number of hours to a new instance of Date, with the starting value from this instance
         * @param hours The number of hours to add
         * @returns {Date}
         */
        addHours(hours: number): Date;

        /**
         * 
         * Adds the given number of days to a new instance of Date, with the starting value from this instance
         * @param days The number of days to add
         * @returns {Date}
         */
        addDays(days: number): Date;

        /**
         * 
         * Adds the given number of weeks to a new instance of Date, with the starting value from this instance
         * @param weeks The number of weeks to add
         * @returns {Date}
         */
        addWeeks(weeks: number): Date;

        /**
         * 
         * Adds the given number of months (30 days) to a new instance of Date, with the starting value from this instance
         * @param months The number of months (30 days) to add
         * @returns {Date}
         */
        addMonths(months: number): Date;

        /**
         * 
         * Adds the given number of years (365 days) to a new instance of Date, with the starting value from this instance
         * @param years The number of years (365 days per year) to add
         * @returns {Date}
         */
        addYears(years: number): Date;
        
        /**
         * Checks if this date instance is a valid date
         *
         * @returns {boolean}
         */
        isValidDate(): boolean;

        /**
         * Formats this date instance into the given format and returns it  
              'YYYY': Full year (e.g., 2024)  
              'YY':   Last two digits of year (e.g., 24)  
              'MM':   Month with leading zero (e.g., 01 - 12)  
              'M':    Month without leading zero (e.g., 1 - 12)  
              'DD':   Day with leading zero (e.g., 01 - 31)  
              'D':    Day without leading zero (e.g., 1 - 31)  
              'HH':   Hour in 24-hour format with leading zero (e.g., 00 - 23)  
              'H':    Hour in 24-hour format without leading zero (e.g., 0 - 23)  
              'hh':   Hour in 12-hour format with leading zero (e.g., 01 - 12)  
              'h':    Hour in 12-hour format without leading zero (e.g., 1 - 12)  
              'nn':   Minute with leading zero (e.g., 00 - 59)  
              'n':    Minute without leading zero (e.g., 0 - 59)  
              'ss':   Second with leading zero (e.g., 00 - 59)  
              's':    Second without leading zero (e.g., 0 - 59)  
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

Date.prototype.ToBlockchainTimestamp = function (): number {
    const timestamp = this.getTime(); // in seconds
    const result = Math.floor((timestamp) / 1000);
    return result;
}

/**
 * Returns a new instance of Date with the added number of seconds
*/
Date.prototype.addSeconds = function (seconds: number) {
    const result = new Date(this);
    result.setSeconds(result.getSeconds() + seconds);
    return result;
};

/**
* Returns a new instance of Date with the added number of minutes
*/
Date.prototype.addMinutes = function (minutes: number) {
    const result = new Date(this);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
};

/**
 * Returns a new instance of Date with the added number of hours
*/
Date.prototype.addHours = function (hours: number) {
    const result = new Date(this);
    result.setHours(result.getHours() + hours);
    return result;
};

/**
 * Returns a new instance of Date with the added number of days
*/
Date.prototype.addDays = function (days: number) {
    const result = new Date(this);
    result.setDate(result.getDate() + days);
    return result;
};

/**
 * Returns a new instance of Date with the added number of weeks
*/
Date.prototype.addWeeks = function (weeks: number) {
    const newDate = new Date(this);
    const result = newDate.addDays(weeks * 7);
    return result;
};

/**
 * Returns a new instance of Date with the added number of months (30 days per month)
*/
Date.prototype.addMonths = function (months: number) {
    const newDate = new Date(this);
    const result = newDate.addDays(months * 30);
    return result;
};

/**
 * Returns a new instance of Date with the added number of years
*/
Date.prototype.addYears = function (years: number) {
    const result = new Date(this);
    var dt = result.getDate();
    result.setFullYear(result.getFullYear() + years);
    var currDt = result.getDate();
    if (dt !== currDt) {
        result.addDays(-currDt);
    }
    return result;
};

Date.prototype.isValidDate = function (): boolean {
    const result = this instanceof Date && !isNaN(this.valueOf());
    return result;
}

Date.prototype.toFormat = function (format: string) {
    const result = toFormat(this, format);
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
 * Returns a string for the date in the given format  
      'YYYY': Full year (e.g., 2024)  
      'YY':   Last two digits of year (e.g., 24)  
      'MM':   Month with leading zero (e.g., 01 - 12)  
      'M':    Month without leading zero (e.g., 1 - 12)  
      'DD':   Day with leading zero (e.g., 01 - 31)  
      'D':    Day without leading zero (e.g., 1 - 31)  
      'HH':   Hour in 24-hour format with leading zero (e.g., 00 - 23)  
      'H':    Hour in 24-hour format without leading zero (e.g., 0 - 23)  
      'hh':   Hour in 12-hour format with leading zero (e.g., 01 - 12)  
      'h':    Hour in 12-hour format without leading zero (e.g., 1 - 12)  
      'nn':   Minute with leading zero (e.g., 00 - 59)  
      'n':    Minute without leading zero (e.g., 0 - 59)  
      'ss':   Second with leading zero (e.g., 00 - 59)  
      's':    Second without leading zero (e.g., 0 - 59)  
 *
 *
 * @param {Date} d date instance
 * @param {string} format string format
 * @returns {string}
 */
function toFormat(d: Date, format: string): string {
    assert(d.isValidDate(), 'date instance is invalid!');
    const padZero = (value: number, length: number) => String(value).padStart(length, '0');

    const hour = d.getHours();
    const isPM = hour >= 12;
    
    const replacements: { [key: string]: string } = {
        'YYYY': d.getFullYear().toString(),                  // Full year (e.g., 2024)
        'YY': d.getFullYear().toString().slice(-2),          // Last two digits of year (e.g., 24)
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

    return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|nn|n|ss|s|AM|PM|am|pm/g, match => replacements[match]);
}


export {
    fromBlockchainTimestamp,
    getEstimatedBlockNumberForDuration,
    JSDateAddYears,
    JSDateAddMonths,
    JSDateAddWeeks,
    JSDateAddDays,
    JSDateAddHours,
    JSDateAddMins,
    JSDateAddSecs,
    JSTimeToUTC,
    JSDateToBlockchainTimestamp,
    DiffDuration,
    isValidDate,
    toFormat
}
