import path from "path";
import * as fs from "fs";
import assert from "assert";

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
        result = (index==-1)?"":AFilename.substring(index+1, AFilename.length);
    }
    return result;
}

function extractFileName(AFileName: string): string {
    const index = AFileName.lastIndexOf(path.sep)+1;
    const result = AFileName.substring(index);
    return result;
}

function FileExists(AFileName: string): boolean {
    let result = false;
    try {
        result = fs.existsSync(AFileName);
    } catch(e) {
        // silent
    }
    return result;
}

function IncludeTrailingPathDelimiter(APath: string): string {
    const result = (APath.charAt(APath.length-1)!=path.sep)?(APath+path.sep):APath;
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

