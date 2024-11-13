
import path = require("path");
import {
    CreateDir, ExtractFileDir, DirectoryExists, RemoveDir,

    DeleteEnvironmentVariable,
    ExistsEnvironmentVariable,

    ExtractFileExt, ExtractFileName, FileExists,
    GetDirectories,
    GetEnvironmentVariable,
    IncludeTrailingPathDelimiter,
    LowerCase,

    SetEnvironmentVariable,
    TSearchRec,
    UpperCase,
    faDirectory,
    hasFieldOfType,
    isArbitraryObject,
} from "../src/sysutils";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function isDirectory(sr: TSearchRec): boolean {
    const result = (sr.Attr & faDirectory) == faDirectory;
    return result;
}

function GenerateVarName(maxLen?: number): string {
    const Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const Lower = Upper.toLowerCase();
    const firstGroup = Upper + Lower + "_";
    const secondGroup = "0123456789" + firstGroup;
    const firstLen = firstGroup.length;
    const len1 = getRandomInt(firstLen);
    const tempResult = [];
    for (let i = 0; i < len1; i++) {
        tempResult.push(firstGroup[getRandomInt(firstLen)])
        if (maxLen && tempResult.length >= maxLen) {
            break;
        }
    }
    const secondLen = secondGroup.length;
    const len2 = getRandomInt(secondLen);
    for (let i = 0; i < len2; i++) {
        if (maxLen && tempResult.length >= maxLen) {
            break;
        }
        tempResult.push(secondGroup[getRandomInt(secondLen)]);
        if (maxLen && tempResult.length >= maxLen) {
            break;
        }
    }
    const result = tempResult.join("");
    return result;
}

describe('test SysUtils.test functions', () => {

    test('isDirectory', () => {
        const sr: TSearchRec = {
            Time: 0,
            Size: 0,
            Attr: faDirectory,
            Name: "",
            ExcludeAttr: 0,
            LastAccessTime: new Date(),
            TimeStamp: new Date()
        }
        const result = isDirectory(sr);
        expect(result).toBeTruthy();
    });

    test('isDirectory false', () => {
        const sr: TSearchRec = {
            Time: 0,
            Size: 0,
            Attr: 0,
            Name: "",
            ExcludeAttr: 0,
            LastAccessTime: new Date(),
            TimeStamp: new Date(),
            CreationTime: 0
        }
        const result = isDirectory(sr);
        expect(result).toBeFalsy();
    });

})

describe('testing SysUtils library', () => {

    test('CreateDir', () => {
        const newDir = IncludeTrailingPathDelimiter(__dirname) + GenerateVarName(10);
        if (!DirectoryExists(newDir)) {
            const successful = CreateDir(newDir);
            expect(successful).toBeTruthy();
        }
        const removedDir = RemoveDir(newDir);
        expect(removedDir).toBeTruthy();
    });

    test('GetDirectories', () => {
        const parent = ExtractFileDir(__dirname);
        let dirCount = 0;
        const directories = GetDirectories(parent, (name: string, sr: TSearchRec) => {
            const result = isDirectory(sr);
            if (result) {
                dirCount++;
            }
            return result;
        });
        expect(directories.length).toBe(dirCount);
    });

    test('RemoveDir', () => {
        const newDir = IncludeTrailingPathDelimiter(__dirname) + GenerateVarName();
        if (!DirectoryExists(newDir)) {
            const successful = CreateDir(newDir);
            expect(successful).toBeTruthy();
        }
        const removedDir = RemoveDir(newDir);
        expect(removedDir).toBeTruthy();
    })

    test('RemoveDir failure', () => {
        if (!DirectoryExists("c:\\testdir")) {
            const successful = CreateDir("c:\\testdir");
            expect(successful).toBeTruthy();
        }

        const removedDir = RemoveDir("C:\\testdir", false);
        expect(removedDir).toBeTruthy();
    });

    test('IncludeTrailingPathDelimiter No Trailing Delimiter', () => {
        expect(IncludeTrailingPathDelimiter("path")).toEqual("path" + path.sep);
    });

    test('IncludeTrailingPathDelimiter Trailing Delimeter', () => {
        expect(IncludeTrailingPathDelimiter("path" + path.sep)).toEqual("path" + path.sep);
    });

    test('FileExist non-existent file', () => {
        expect(FileExists("nothing.pas")).toEqual(false);
    });

    test('FileExist existing file', () => {
        expect(FileExists(__filename)).toEqual(true);
    });

    test('ExtractFileDir filename without dir', () => {
        expect(ExtractFileDir("Nothing.pas")).toEqual("");
    });

    test('ExtractFileDir full path name', () => {
        expect(ExtractFileDir(path.resolve(__dirname, "Nothing.pas"))).toEqual(__dirname);
    });

    test('ExtractFileExt no dir, filename with ext', () => {
        const fileext = ExtractFileExt("Nothing.pas");
        expect(fileext).toEqual("pas");
    });

    test('ExtractFileExt no dir, filename without ext', () => {
        expect(ExtractFileExt("Nothing")).toEqual("");
    });
    test('ExtractFileExt dirname with dot, filename no dot', () => {
        expect(ExtractFileExt(path.resolve("path1.path2", "Nothing"))).toEqual("");
    });
    test('ExtractFileExt dirname with dot, filename with dot', () => {
        expect(ExtractFileExt(path.resolve("path1.path2", "Nothing.ext"))).toEqual("ext");
    });

    test('ExtractFileName dirname with dot, filename with dot', () => {
        expect(ExtractFileName(path.resolve("path1.path2", "Nothing.ext"))).toEqual("Nothing.ext");
    });

    test('ExtractFileName dirname with dot, filename', () => {
        expect(ExtractFileName(path.resolve("path1.path2", "Nothing"))).toEqual("Nothing");
    });

    test('ExtractFileName without dir, filename', () => {
        expect(ExtractFileName("Nothing")).toEqual("Nothing");
    });

    test('LowerCase', () => {
        expect(LowerCase("ABCD")).toEqual("abcd");
    });

    test('UpperCase', () => {
        expect(UpperCase("abcde")).toEqual("ABCDE");
    });

    describe("hasFieldOfType", () => {
        let obj = {
            message: "An error occurred.",
            code: 404
        };

        test("hasFieldOfType<number>", () => {
            expect(hasFieldOfType<number>(obj, "code", "number")).toEqual(true);
        });

        test("hasFieldOfType<string>", () => {
            expect(hasFieldOfType<string>(obj, "message", "string")).toEqual(true);
        });

        test("hasFieldOfType<boolean>", () => {
            expect(hasFieldOfType<boolean>(obj, "message", "boolean")).toBeFalsy();
        });
    });

    describe('EnvironmentVariables', () => {

        test("DeleteEnvironmentVariable", () => {
            const LVarName = GenerateVarName();
            const LValue = GenerateVarName();
            SetEnvironmentVariable(LVarName, LValue);
            expect(GetEnvironmentVariable(LVarName)).toEqual(LValue);
            DeleteEnvironmentVariable(LVarName);
            expect(GetEnvironmentVariable(LVarName)).toEqual("");
        });

        test("ExistsEnvironmentVariable", () => {
            const LVarName = GenerateVarName();
            const result = ExistsEnvironmentVariable(LVarName);
            expect(result).toBeFalsy();
        });


        test("GetEnvironmentVariable", () => {
            const LVarName = GenerateVarName();
            const LValue = GenerateVarName();
            SetEnvironmentVariable(LVarName, LValue);
            expect(GetEnvironmentVariable(LVarName)).toEqual(LValue);
        });

        test("SetEnvironmentVariable non-existent var", () => {
            const LVarName = GenerateVarName();
            const LValue = GenerateVarName();
            SetEnvironmentVariable(LVarName, LValue);
            expect(GetEnvironmentVariable(LVarName)).toEqual(LValue);
        });

        test("SetEnvironmentVariable existing var", () => {
            const LVarName = GenerateVarName();
            const LValue = GenerateVarName();
            const LValue2 = GenerateVarName();
            DeleteEnvironmentVariable(LVarName);
            expect(GetEnvironmentVariable(LVarName)).toEqual("");
            SetEnvironmentVariable(LVarName, LValue);
            expect(GetEnvironmentVariable(LVarName)).toEqual(LValue);
            SetEnvironmentVariable(LVarName, LValue2);
            expect(GetEnvironmentVariable(LVarName)).toEqual(LValue2);
        });

        test("GetEnvironmontVariable non-existent", () => {
            const LVarName = GenerateVarName();
            DeleteEnvironmentVariable(LVarName);
            expect(GetEnvironmentVariable(LVarName)).toEqual("");
        });
    });

    describe('isArbitraryObject', () => {

        it("should identify isArbitraryObject correctly", () => {
            const obj = {};
            const objResult = isArbitraryObject(obj);
            expect(objResult).toBe(true);
        });

        it("shouldn't identify null as isArbitraryObject", () => {
            const obj = null;
            const objResult = isArbitraryObject(obj);
            expect(objResult).toBe(false);
        });

        it("shouldn't identify undefined as isArbitraryObject", () => {
            const obj = undefined;
            const objResult = isArbitraryObject(obj);
            expect(objResult).toBe(false);
        });

        it("shouldn't identify number as isArbitraryObject", () => {
            const objResult = isArbitraryObject(5);
            expect(objResult).toBe(false);
        });

        it("shouldn't identify array as isArbitraryObject", () => {
            const objResult = isArbitraryObject([]);
            expect(objResult).toBe(false);
        });

        it("shouldn't identify Function as isArbitraryObject", () => {
            const objResult = isArbitraryObject(function () { });
            expect(objResult).toBe(false);
        });

        it("shouldn't identify date as isArbitraryObject", () => {
            const objResult = isArbitraryObject(new Date());
            expect(objResult).toBe(false);
        });

        it("shouldn't identify regex as isArbitraryObject", () => {
            const everythingRegex = /[\s\S]*/;
            const objResult = isArbitraryObject(everythingRegex);
            expect(objResult).toBe(false);
        });

    });

});
