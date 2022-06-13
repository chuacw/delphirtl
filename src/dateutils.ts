import { ethers } from "ethers";
declare global {
    interface Date {
        ToBlockchainTimestamp(): number;
    }
}

/**
 * @param  {number} block.timestamp
 * @returns Converted block.timestamp to Date
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
 * @param  {Date} date
 * @param  {number} years
 * @returns Date
 */
function JSDateAddYears(date: Date, years: number): Date {
    const result = new Date(date.getTime());
    result.setFullYear(result.getFullYear() + years);
    return result;
}

/**
 * @param  {Date} time
 * @param  {number} days
 * @returns Date
 */
function JSDateAddDays(time: Date, days: number): Date {
    const daysInMins = days * 24 * 60; // 1 day is 24 hours of 60 minutes
    const result = JSDateAddMins(time, daysInMins);
    return result;
}

/**
 * @param  {Date} time
 * @param  {number} hours
 * @returns Date
 */
function JSDateAddHours(time: Date, hours: number): Date {
    const hoursInMin = hours * 60;
    const result = JSDateAddMins(time, hoursInMin);
    return result; 
}

/**
 * @param  {Date} time
 * @param  {number} mins
 * @returns Date
 */
function JSDateAddMins(time: Date, mins: number): Date {
    const timestamp = time.getTime();
    const minsInMS = mins * 60 * 1000; // 1 min is 60,000 ms
    const result = new Date(timestamp + minsInMS);
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

export {
    fromBlockchainTimestamp,
    getEstimatedBlockNumberForDuration,
    JSDateAddYears,
    JSDateAddDays,
    JSDateAddMins,
    JSTimeToUTC,
    JSDateToBlockchainTimestamp
}
