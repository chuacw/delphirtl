import path from "path";
import * as fs from "fs";
import assert from "assert";

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

function boolToInt(value: boolean): number {
    return value ? 1 : 0
}

class TDateTime {
    Value: number
    constructor(AValue: number) {this.Value = AValue}
}

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

interface TTimeStamp {
    Time: number;
    Date: number;
}

// function DecodeDateFully(DateTime: TDateTime, Year: TYMD, Month: TYMD, Day: TYMD, DOW: TYMD): boolean {
//     const D1 = 365;
//     const D4 = D1 * 4 + 1;
//     const D100 = D4 * 25 - 1;
//     const D400 = D100 * 4 + 1;
//     let Y, M, D, I, T: number
//     T = DateTimeToTimeStamp(DateTime).Date
// }

// function DecodeDateFully(const DateTime: TDateTime; var Year, Month, Day, DOW: Word): Boolean;
// const
//   D1 = 365;
//   D4 = D1 * 4 + 1;
//   D100 = D4 * 25 - 1;
//   D400 = D100 * 4 + 1;
// var
//   Y, M, D, I: Word;
//   T: Integer;
//   DayTable: PDayTable;
// begin
//   T := DateTimeToTimeStamp(DateTime).Date;
//   if T <= 0 then
//   begin
//     Year := 0;
//     Month := 0;
//     Day := 0;
//     DOW := 0;
//     Result := False;
//   end else
//   begin
//     DOW := T mod 7 + 1;
//     Dec(T);
//     Y := 1;
//     while T >= D400 do
//     begin
//       Dec(T, D400);
//       Inc(Y, 400);
//     end;
//     DivMod(T, D100, I, D);
//     if I = 4 then
//     begin
//       Dec(I);
//       Inc(D, D100);
//     end;
//     Inc(Y, I * 100);
//     DivMod(D, D4, I, D);
//     Inc(Y, I * 4);
//     DivMod(D, D1, I, D);
//     if I = 4 then
//     begin
//       Dec(I);
//       Inc(D, D1);
//     end;
//     Inc(Y, I);
//     Result := IsLeapYear(Y);
//     DayTable := @MonthDays[Result];
//     M := 1;
//     while True do
//     begin
//       I := DayTable^[M];
//       if D < I then Break;
//       Dec(D, I);
//       Inc(M);
//     end;
//     Year := Y;
//     Month := M;
//     Day := D + 1;
//   end;
// end;


function TryEncodeDate(Year: number, Month: number, Day: number, Date: TDateTime): boolean {
    let result = false
    let DayTable = MonthDays[boolToInt(IsLeapYear(Year))]
    if ((Year >= 1) && (Year <= 9999) && (Month >= 1) && (Month <= 12) &&
        (Day >= 1) && (Day <= DayTable[Month])) {
        for (let i = 1; i <= Month - 1; i++) { Day += DayTable[i] }
        let I = Year - 1;
        Object.assign(Date, new TDateTime((I * 365) + Math.trunc(I / 4) - Math.trunc(I / 100) + Math.trunc(I / 400) + Day - DateDelta));
        result = true;
    }
    return result
}
// var
//   I: Integer;
//   DayTable: PDayTable;
// begin
//   Result := False;
//   DayTable := @MonthDays[IsLeapYear(Year)];
//   if (Year >= 1) and (Year <= 9999) and (Month >= 1) and (Month <= 12) and
//     (Day >= 1) and (Day <= DayTable^[Month]) then
//   begin
//     for I := 1 to Month - 1 do Inc(Day, DayTable^[I]);
//     I := Year - 1;
//     Date := I * 365 + I div 4 - I div 100 + I div 400 + Day - DateDelta;
//     Result := True;
//   end;
// end;

// function Now(): TDateTime {
// }

function extractFileDir(AFilename: string): string {
    const index = AFilename.lastIndexOf(path.sep);
    const result = AFilename.substring(0, index);
    return result;
}

function extractFileExt(AFilename: string): string {
    let result = "";
    const LPathDelimIndex = AFilename.lastIndexOf(path.sep);
    const index = AFilename.lastIndexOf(".");
    if (index > LPathDelimIndex) { // ensure . is after path separator  
        result = (index == -1) ? "" : AFilename.substring(index + 1, AFilename.length);
    }
    return result;
}

function extractFileName(AFileName: string): string {
    const index = AFileName.lastIndexOf(path.sep) + 1;
    const result = AFileName.substring(index);
    return result;
}

function FileExists(AFileName: string): boolean {
    let result = false;
    try {
        result = fs.existsSync(AFileName);
    } catch (e) {
        // silent
    }
    return result;
}

function IncludeTrailingPathDelimiter(APath: string): string {
    const result = (APath.charAt(APath.length - 1) != path.sep) ? (APath + path.sep) : APath;
    return result;
}

function LowerCase(str: string): string {
    return str.toLowerCase();
}
function UpperCase(str: string): string {
    return str.toUpperCase();
}

function DeleteEnvironmentVariable(Name: string) {
    delete process.env[Name];
}

// In Reactjs, only env vars starting with REACT_APP_ is allowed
// Anything else will not show up
// Nextjs, only env vars starting with NEXT_PUBLIC_ are allowed
function GetEnvironmentVariable(Name: string): string {
    const result = process.env[Name] || "";
    return result;
}

function SetEnvironmentVariable(Name: string, Value: string) {
    assert(Name); assert(Value);
    process.env[Name] = Value;
}

export {
    extractFileDir, extractFileDir as ExtractFileDir,
    extractFileExt, extractFileExt as ExtractFileExt,
    extractFileName, extractFileName as ExtractFileName,
    FileExists as getFileExists, FileExists,
    IncludeTrailingPathDelimiter, IncludeTrailingPathDelimiter as includeTrailingPathDelimiter,
    LowerCase, UpperCase,
    DeleteEnvironmentVariable, DeleteEnvironmentVariable as deleteEnvironmentVariable,
    GetEnvironmentVariable, GetEnvironmentVariable as getEnvironmentVariable,
    SetEnvironmentVariable, SetEnvironmentVariable as setEnvironmentVariable
}

function DateTimeToTimeStamp(DateTime: TDateTime) {
}
