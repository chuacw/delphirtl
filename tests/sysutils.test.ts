
import path from "path";

import {
    CreateDir, ExtractFileDir, DirectoryExists, RemoveDir,

    DeleteEnvironmentVariable,
    ExistsEnvironmentVariable,

    ExtractFileExt, ExtractFileName, FileExists, Format,
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
    GetCurrentDir,
    SetCurrentDir,
} from "../src/sysutils";
import { TIMEOUT } from "dns";

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
    const tempResult: string[] = [];
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
            TimeStamp: new Date(),
            CreationTime: 0
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

    test('DirectoryExists', () => {
        const path = "C:\\Windows";
        const isDirectory = DirectoryExists(path);
        expect(isDirectory).toBeTruthy();
    });

    test('!DirectoryExists', () => {
        const path = "C:\\XXXXXXXXXXXXX";
        const isDirectory = DirectoryExists(path);
        expect(isDirectory).toBeFalsy();
    });
    
    test('GetCurrentDir', () => {
        const currentDir = GetCurrentDir();
        expect(__dirname).toContain(currentDir);
    });

    test('SetCurrentDir', () => {
        const currentDir = GetCurrentDir();
        const newDir = ExtractFileDir(currentDir);
        SetCurrentDir(newDir);
        const changedDir = GetCurrentDir();
        expect(changedDir).toEqual(newDir);
    });

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

    test("FileExist on directory shouldn't succeed", () => {
        const result = FileExists(__dirname);
        expect(result).toBeFalsy();
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

describe('Format - specifiers', () => {
    test('%s - string', () => {
        expect(Format('%0:s %0:s', ['hello', 'there'])).toBe('hello hello');
        expect(Format('%.3s', ['abcdef'])).toBe('abc'); // precision truncation
        expect(Format('%s %d', ['Hello', 15])).toBe('Hello 15');
    });

    test('%d / %i - signed integer', () => {
        expect( () => {
            Format('%0:d', [42.9])
        }).toThrow("Format '%0:d' invalid or incompatible with argument");
        expect(() => {
            Format('%0:d', [-42.2])
        }).toThrow("Format '%0:d' invalid or incompatible with argument");
        expect(Format('%d%%', [100])).toBe('100%');
        expect(Format('%d', [7])).toBe('7');
    });

    test('%u - unsigned integer', () => {
        expect(Format('%u', [-5])).toBe('4294967291');
        expect( () => {
            Format('%u', [123.8])
        }).toThrow("Format '%u' invalid or incompatible with argument");
    });

    test('%f - fixed-point', () => {
        expect(Format('%.2f', [1.234])).toBe('1.23'); // 1.23
        expect(Format('%.1f', [-1.25])).toBe('-1.3');
        expect(Format('%.0f', [2.49])).toBe('2');
    });

    test('%e / %E - scientific', () => {
        expect( () => {
            Format('%.2e', [1234])
        }).toThrow("Format '%.2e' invalid or incompatible with argument");
        expect(Format('%.2E', [0.01234])).toBe('1.2E-002');
    });

    test('%g / %G - general', () => {
        expect(() => {Format('%.3g', [12345])}).toThrow("Format '%.3g' invalid or incompatible with argument");
        const G = Format('%.3G', [0.0012345]);
        expect(G).toBe('0.00123');
    });

    test('%x / %X - hex', () => {
        expect(Format('%x', [255])).toBe('ff');
        expect(Format('%X', [255])).toBe('FF');
    });

    test('%p - pointer-like hex', () => {
        expect(Format('%p', [255])).toBe('000000FF');
        expect(Format('%p %P  ', [255, 255])).toBe('000000FF 000000FF  ');
        expect(Format('%p %PHey', [255, 255])).toBe('000000FF 000000FFHey');
    });

    test('%c - char from code', () => {
        expect(Format('%c', [65])).toBe('A');
    });

    test('%% - literal percent', () => {
        expect(Format('value=%%', [])).toBe('value=%');
        expect(Format("value=%% and I'm happy", [])).toBe("value=% and I'm happy");
    });
});

describe('Format - index/width/precision/alignment independently', () => {
    test('indexed arguments', () => {
        expect(Format('%1:s %0:s', ['first', 'second'])).toBe('second first');
        expect(Format('%2:d-%0:d-%1:d', [10, 20, 30])).toBe('30-10-20');
        expect(Format('%1:s %0:s %s %2:s', ['first', 'second', 'third'])).toBe('second first second third');
        expect(() => Format('%1:s %0:s %s %2:s %s %s', ['first', 'second', 'third'])).toThrow("No argument for format '%1:s %0:s %s %2:s %s %s'");
    });

    test('width (right align default)', () => {
        expect(Format('%5s', ['a'])).toBe('    a');
        expect(Format('%5d', [42])).toBe('   42');
    });

    test('left alignment with "-" flag', () => {
        expect(Format('%-5s', ['a'])).toBe('a    ');
        expect(Format('%-6d', [42])).toBe('42    ');
    });

    test('precision for strings (truncation)', () => {
        expect(Format('%.3s', ['abcdef'])).toBe('abc');
        expect(Format('%.8s', ['abcdef'])).toBe('abcdef');
        const S = ['hello', 'there', 'here'];
        expect(Format('array [0..%d] of %s', [S.length-1, 'something'])).toBe('array [0..2] of something');
    });

    test('precision for floats', () => {
        expect(Format('%.2f', [1.239])).toBe('1.24');
        expect(Format('%.0f', [1.5])).toBe('2');
        expect(Format('%.8f', [1.1e-3])).toBe('0.00110000');
    });

    test('sign flags for integers and floats', () => {
        expect(Format('%d', [5])).toBe('5');
        expect(Format('%f', [-1.2])).toBe('-1.200000');
        expect(Format('%f', [1.23e7])).toBe('12300000.00');
        expect(Format('%f', [1.1e1])).toBe('11.00');
        expect(Format('%f', [1.1e-1])).toBe('0.11');
        expect(Format('%f', [1.1e-3])).toBe('0.00');
    });

    test('width with sign', () => {
        expect(Format('%5d', [7])).toBe('    7');
    });

    test('Width with precision', () => {
        expect(Format('%-2.6d', [42])).toBe('000042');
        expect(Format('%-2.6d', [-42])).toBe('-000042');
    })
});

describe('Format - errors', () => {
    test('out of range index', () => {
        expect(() => Format('%3:s', ['a', 'b'])).toThrow("No argument for format '%3:s'");
    });
    test('non-finite number', () => {
        expect(() => Format('%d', [Infinity])).toThrow("Format '%d' invalid or incompatible with argument");
    });
    test('Invalid format specifier', () => {
        expect(() => Format('%d %o', [124, 'Hey'])).toThrow("Format '%d %o' invalid or incompatible with argument");
        expect(() => Format('%d', [1.3])).toThrow("Format '%d' invalid or incompatible with argument");
        expect(() => Format('%f', [50])).toThrow("Format '%f' invalid or incompatible with argument");
        expect(() => Format('%d', [Infinity])).toThrow("Format '%d' invalid or incompatible with argument");
        expect(() => Format('%s', [Infinity])).toThrow("Format '%s' invalid or incompatible with argument");
    });
    test('Empty specifier', () => {
        expect(Format('%', [1.2345, -0.45, 1.1e3])).toBe('');
    });
});


describe('Format - combined index/width/precision/alignment', () => {
    test('integers with index/width/precision/alignment', () => {
        expect(Format('%2:.6d|%0:8.4d|%-10d', [7, -42, 123])).toBe('000123|    0007|-42       ');
    });

    test('booleans as strings with width/precision/alignment and index', () => {
        expect(() => Format('%1:-6.3s|%0:5s', [true, false])).toThrow("Format '%1:-6.3s|%0:5s' invalid or incompatible with argument");
    });

    test('floats (including exponential) with width/precision and alignment', () => {
        expect(Format('%0:8.2f|%1:-7.3f|%2:10f', [1.2345, -0.45, 1.1e3])).toBe('    1.23|-0.450 |   1100.00');
    });

    test('positive/negative ints with width and precision', () => {
        expect(Format('%1:8.5d|%0:-6.4d', [5, -12])).toBe('  -00012|0005  ');
    });

    test('small exponential to fixed with width and precision', () => {
        expect(Format('%6.2f', [1.1e-1])).toBe('  0.11');
    });
});
