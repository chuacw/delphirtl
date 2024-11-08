import path from "path";
import * as fs from "fs";
import assert from "assert";

/**
 * Description placeholder
 *
 * @param {number} Year
 * @returns {boolean}
 * @category SysUtils
 */
function IsLeapYear(Year: number): boolean {
    //   Result := (Year mod 4 = 0) and ((Year mod 100 <> 0) or (Year mod 400 = 0));
    const result = (Year % 4 == 0) && ((Year % 100 != 0) || (Year % 400 == 0))
    return result;
}

const MonthDays = [
    [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]

// ((31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
//  (31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31));

// { Days between 1/1/0001 and 12/31/1899 }

const DateDelta = 693594;

/**
 * Description placeholder
 *
 * @param {boolean} value
 * @returns {number}
 * @category SysUtils
 */
function boolToInt(value: boolean): number {
    return value ? 1 : 0
}

/**
 * Description placeholder
 *
 * @class TDateTime
 * @typedef {TDateTime}
 * @category SysUtils
 */
class TDateTime {
    Value: number
    constructor(AValue: number) {this.Value = AValue}
}

/**
 * Description placeholder
 *
 * @class TYMD
 * @typedef {TYMD}
 * @category SysUtils
 */
class TYMD {
    Year: number
    Month: number
    Day: number
    DOW: number
    constructor() {
        this.Year = 0;
        this.Month = 0;
        this.Day = 0;
        this.DOW = 0;
    }
}

/**
 * Description placeholder
 *
 * @interface TTimeStamp
 * @typedef {TTimeStamp}
 * @category SysUtils
 */
interface TTimeStamp {
    Time: number;
    Date: number;
}

/**
 * Description placeholder
 *
 * @param {string} AFilename
 * @returns {string}
 * @category SysUtils
 */
function ExtractFileDir(AFilename: string): string {
    const index = AFilename.lastIndexOf(path.sep);
    const result = AFilename.substring(0, index);
    return result;
}

/**
 * Description placeholder
 *
 * @param {string} AFilename
 * @returns {string}
 * @category SysUtils
 */
function ExtractFileExt(AFilename: string): string {
    let result = "";
    const LPathDelimIndex = AFilename.lastIndexOf(path.sep);
    const index = AFilename.lastIndexOf(".");
    if (index > LPathDelimIndex) { // ensure . is after path separator  
        result = (index == -1) ? "" : AFilename.substring(index + 1, AFilename.length);
    }
    return result;
}

/**
 * Extracts the name and extension parts of a file name.
 *
 * The resulting string is the rightmost characters of FileName, starting with the first character after the colon or backslash that separates the path information from the name and extension. The resulting string is equal to FileName, if FileName contains no drive and directory parts. 
 * @param AFileName 
 * @returns 
 * @category SysUtils
 */
function ExtractFileName(AFileName: string): string {
    const index = AFileName.lastIndexOf(path.sep) + 1;
    const result = AFileName.substring(index);
    return result;
}

/**
 * Checks if the given filename exists
 *
 * @param {string} AFileName Filename to check existence for.
 * @returns {boolean} true if the given filename exists, false otherwise.
 * @category SysUtils
 */
function FileExists(AFileName: string): boolean {
    let result = false;
    try {
        result = fs.existsSync(AFileName);
    } catch (e) {
        // silent
    }
    return result;
}

/**
 * Adds a path delimiter to the given string. If the path delimiter is already at the end of the string, does nothing.
 *
 * @param {string} APath Given path to check for delimiter to add to
 * @returns {string} The path with added delimiter
 * @category SysUtils
 */
function IncludeTrailingPathDelimiter(APath: string): string {
    const result = (APath.charAt(APath.length - 1) != path.sep) ? (APath + path.sep) : APath;
    return result;
}

/**
 * Description placeholder
 *
 * @param {string} str
 * @returns {string}
 * @category SysUtils
 */
function LowerCase(str: string): string {
    return str.toLowerCase();
}

/**
 * Description placeholder
 *
 * @param {string} str
 * @returns {string}
 * @category SysUtils
 */
function UpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * Deletes the given name from the environment variable
 *
 * @param {string} Name
 * @category SysUtils
 */
function DeleteEnvironmentVariable(Name: string) {
    delete process.env[Name];
}

/**
 * Description placeholder
 *
 * @type {"REACT_APP_"}
 * @category Constants
 */
const ENV_REACT_PREFIX = "REACT_APP_";

/**
 * Description placeholder
 *
 * @type {"NEXT_PUBLIC_"}
 * @category Constants
 */
const ENV_NEXT_PREFIX = "NEXT_PUBLIC_";

// In Reactjs, only env vars starting with REACT_APP_ is allowed
// Anything else will not show up
// Nextjs, only env vars starting with NEXT_PUBLIC_ are allowed
/**
 * Retrieves the contents of the specified variable from the environment block
 * 
 * @param Name 
 * @returns 
 * @category SysUtils
 */
function GetEnvironmentVariable(Name: string): string {
    const result = process.env[Name] || "";
    return result;
}

/**
 * Sets the specified variable in the environment with the given value
 *
 * @param {string} Name
 * @param {string} Value
 * @category SysUtils
 */
function SetEnvironmentVariable(Name: string, Value: string) {
    assert(Name); assert(Value);
    process.env[Name] = Value;
}

/**
 * An object
 *
 * @typedef {ArbitraryObject}
 * @category SysUtils
 */
export type ArbitraryObject = { [key: string]: unknown; };


/**
 * Checks if the given parameter is an object
 * @param potentialObj item to check as an object
 * @returns boolean
 * @category SysUtils
 */
function isArbitraryObject(potentialObj: unknown): potentialObj is ArbitraryObject {
    // an array/date is identified as an object in JavaScript
    // so this function checks that the potentialObject is not an array/date, and not a regex
    const result = (potentialObj !== null) && 
                   (!Array.isArray(potentialObj)) &&
                   (!(potentialObj instanceof RegExp)) &&
                   (!(potentialObj instanceof Date)) &&
                   (typeof potentialObj === "object");
    return result;
}

/**
 * Checks that obj is an object, and it has a field named fieldName and that its type is fieldType  
 * Assuming e is an object with the field code of type string.  
 * * If you use this, then the expression following it is valid, for example:  
 *   - hasFieldOfType<string>(e, "code", "string") && e.code === "INSUFFICIENT_FUNDS")  
 * * If you do not use it, then  
 *   - e.code is invalid when checked by code analyzer
 * @param obj 
 * @param fieldName 
 * @param fieldType 
 * @returns 
 * @category SysUtils
 */
function hasFieldOfType<T>(obj: unknown, fieldName: string, fieldType: string): obj is { [fieldName: string]: T } {
    const result =
      isArbitraryObject(obj) && 
      typeof obj[fieldName] === fieldType;
    return result;
}
  
/**
 * Checks if the given object has a message field of string type 
 *
 * @param obj 
 * @returns 
 * @category SysUtils
 */
function hasMessageField(obj: unknown): obj is { message: string } {
    const result = 
      hasFieldOfType<string>(obj, "message", "string");
    return result;
}
   
export {
    ExtractFileDir,
    ExtractFileExt,
    ExtractFileName,
    FileExists,
    IncludeTrailingPathDelimiter, 
    LowerCase, UpperCase, LowerCase as lowerCase, UpperCase as upperCase,
    DeleteEnvironmentVariable,
    GetEnvironmentVariable,
    SetEnvironmentVariable,
    hasMessageField, hasFieldOfType, isArbitraryObject,
    ENV_NEXT_PREFIX, ENV_REACT_PREFIX
}
