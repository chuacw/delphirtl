
import path = require("path");
import { DeleteEnvironmentVariable, ExtractFileDir, ExtractFileExt, ExtractFileName, FileExists, GetEnvironmentVariable, IncludeTrailingPathDelimiter, LowerCase, SetEnvironmentVariable, UpperCase } from "../src/sysutils";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
  
function GenerateVarName(): string {
    const Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const Lower = Upper.toLowerCase();
    const firstGroup = Upper + Lower + "_";
    const secondGroup = "0123456789" + firstGroup;
    const firstLen = firstGroup.length;
    const len1 = getRandomInt(firstLen);
    const tempResult = [];
    for (let i=0; i<len1; i++) {
        tempResult.push(firstGroup[getRandomInt(firstLen)])
    }
    const secondLen = secondGroup.length;
    const len2 = getRandomInt(secondLen);
    for (let i=0; i<len2; i++) {
        tempResult.push(secondGroup[getRandomInt(secondLen)]);
    }
    const result = tempResult.join("");
    return result;
}

describe('testing SysUtils library', () => {
    test('IncludeTrailingPathDelimiter No Trailing Delimiter', () => {
        expect(IncludeTrailingPathDelimiter("path")).toEqual("path" + path.sep);
    });
    test('IncludeTrailingPathDelimiter Trailing Delimeter', () => {
        expect(IncludeTrailingPathDelimiter("path"+path.sep)).toEqual("path" + path.sep);
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
        expect(ExtractFileExt("Nothing.pas")).toEqual("pas");
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
    test('UpperCase', ()=> {
        expect(UpperCase("abcde")).toEqual("ABCDE");
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

});
