import path from "path";
import * as fs from "fs";
import assert from "assert";
import { chdir, cwd } from "process";
import { FormatDateTime } from "./dateutils";

/**
 * Returs true if the given year is a leap year
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
 * Returns 1 if the given boolean is true, 0 otherwise
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
    constructor(AValue: number) { this.Value = AValue }
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
 * Creates the given directory, Dir
 *
 * @param {string} Dir
 * @returns {boolean}
 * @category SysUtils
 */
function CreateDir(Dir: string): boolean {
    let result = true;
    try {
        fs.mkdirSync(Dir, { recursive: true });
    } catch (e) {
        result = false
    }
    return result;
}

/**
 * Checks if the given Dir exists or not.
 *
 * @param {string} Dir
 * @returns {boolean}
 * @category SysUtils
 */
function DirectoryExists(Dir: string): boolean {
    let result: boolean;
    try {
        const exists = fs.existsSync(Dir);
        const statSync = fs.statSync(Dir);
        result = statSync.isDirectory() && exists;
    } catch (e) {
        result = false;
    }
    return result;
}

// File attribute constants
export const faInvalid = -1;
export const faReadOnly = 0x00000001;
export const faHidden = 0x00000002; // only a convention on POSIX
export const faSysFile = 0x00000004; // on POSIX system files are not regular files and not directories
export const faVolumeID = 0x00000008; // not used in Win32
/**
 * The referenced item is a directory
 */
export const faDirectory = 0x00000010;
export const faArchive = 0x00000020;
/**
 *  * The referenced item is a file
 *
 * @type {128}
 */
export const faNormal = 0x00000080;
export const faTemporary = 0x00000100;
export const faSymLink = 0x00000400; // Available on POSIX and Vista and above
export const faCompressed = 0x00000800;
export const faEncrypted = 0x00004000;
export const faVirtual = 0x00010000;
export const faAnyFile = 0x000001FF;

export type TSearchRec = {
    Time: number
    Size: number
    Attr: number
    Name: string
    ExcludeAttr: number
    /**
     * Last time it was accessed or modified, whichever's later
     *
     * @type {Date}
     */
    LastAccessTime: Date;
    /**
     * Last modified time
     *
     * @type {Date}
     */
    TimeStamp: Date;
    CreationTime: number;
}

type IPaths = {
    parentPath: string
    path: string
}

export type TFilterPredicate = (path: string, sr: TSearchRec) => boolean;

/**
 * Get subdirectories from the given path, using the given predicate to filter out items
 *
 * @param {string} path
 * @param {TFilterPredicate} predicate
 * @returns {string[]}
 * @category SysUtils
 */
function GetDirectories(path: string, predicate: TFilterPredicate): string[];
/**
 * Get subdirectories from the given path, using the optional predicate to filter out items.
 *
 * @param {string} path
 * @param {?TFilterPredicate} [predicate]
 * @returns {string[]}
 * @category SysUtils
 */
function GetDirectories(path: string, predicate?: TFilterPredicate): string[] {
    let result: string[] = [];
    if (predicate) {
        // filters through the callback
        const rdsResult = fs.readdirSync(path, { withFileTypes: true });
        const filterResult = rdsResult.filter(dirent => {
            const path = (dirent as unknown as IPaths).parentPath;
            const filename = IncludeTrailingPathDelimiter(path) + dirent.name;
            const fsstatResult = fs.statSync(filename);
            const attr = (fsstatResult.isDirectory() ? faDirectory : 0) | (fsstatResult.isFile() ? faNormal : 0);
            const creationTime = fsstatResult.birthtime.getTime();
            const sr: TSearchRec = {
                Size: fsstatResult.size,
                Attr: attr,
                Name: dirent.name,
                ExcludeAttr: 0,
                LastAccessTime: (fsstatResult.atime > fsstatResult.mtime) ? fsstatResult.atime : fsstatResult.mtime,
                TimeStamp: fsstatResult.mtime,
                Time: creationTime,
                CreationTime: creationTime
            };
            const result = predicate(path, sr);
            return result;
        });
        const mapResult = filterResult.map(dirent => dirent.name);
        result = mapResult;
    } else {
        result = fs.readdirSync(path, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }
    return result;
}

/**
 * Removes the given directory, Dir
 *
 * @param {string} Dir
 * @param {?boolean} [Recursive]
 * @returns {boolean}
 * @throws ENOENT
 * @throws ENOTDIR
 * @category SysUtils
 */
function RemoveDir(Dir: string, Recursive?: boolean): boolean {
    let result = true;
    try {
        const opt = { recursive: Recursive ? true : false }
        fs.rmdirSync(Dir, opt);
    } catch (e) {
        result = false;
    }
    return result;
}

/**
 * Gets the current working directory
 * @returns The current working directory
 * @category SysUtils
 */
function GetCurrentDir(): string {
    const result = cwd();
    return result;
}

/**
 * Changes the current working directory to the specified directory
 * @param newDir New working directory
 * @category SysUtils
 */
function SetCurrentDir(newDir: string) {
    chdir(newDir);
}

/**
 * Extracts the drive and directory parts from AFileName.
 * Regardless of whether AFileName is a path or filename,
 * this routine returns the path up to the last path.sep
 * eg, AFileName contains K:\\Development\\TypeScript\\delphirtl\\tests
 * the result is K:\\Development\\TypeScript\\delphirtl
 *
 * @param {string} AFileNameOrPath
 * @returns {string}
 * @category SysUtils
 */
function ExtractFileDir(AFileNameOrPath: string): string {
    const index = AFileNameOrPath.lastIndexOf(path.sep);
    const result = AFileNameOrPath.substring(0, index);
    return result;
}

/**
 * Extracts the file extension, given the filename, AFileName
 * For example, if given "Nothing.pas", returns "pas"
 * If given "Nothing", returns ""
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
 * The resulting string is the rightmost characters of FileName, starting with the first character after
 *  the colon or backslash that separates the path information from the name and extension. The resulting 
 * string is equal to FileName, if FileName contains no drive and directory parts. 
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
 * Only environment variables starting with ENV_REACT_PREFIX are returned in React
 *
 * @type {"REACT_APP_"}
 * @category Constants
 */
const ENV_REACT_PREFIX = "REACT_APP_";

/**
 * Only environment variables starting with ENV_NEXT_PREFIX are returned in Nextjs
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
 * @param Name The name of the environment variable to retrieve
 * @returns The value of the given environment variable
 * @category SysUtils
 */
function GetEnvironmentVariable(Name: string): string {
    const result = process.env[Name] || "";
    return result;
}

/**
 * Checks if an environment variable exists
 *
 * @param {string} Name
 * @returns {boolean}
 * @category SysUtils
 */
function ExistsEnvironmentVariable(Name: string): boolean {
    const EnvValue = process.env[Name];
    const result = EnvValue !== undefined;
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
    CreateDir, DirectoryExists,
    GetDirectories, GetCurrentDir, SetCurrentDir, 
    RemoveDir,
    ExtractFileDir,
    ExtractFileExt,
    ExtractFileName,
    FileExists,
    FormatDateTime,
    IncludeTrailingPathDelimiter,
    LowerCase, UpperCase, LowerCase as lowerCase, UpperCase as upperCase,
    DeleteEnvironmentVariable, ExistsEnvironmentVariable,
    GetEnvironmentVariable, SetEnvironmentVariable,
    hasMessageField, hasFieldOfType, isArbitraryObject,
    IsLeapYear,
    ENV_NEXT_PREFIX, ENV_REACT_PREFIX
}
