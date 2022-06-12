
import path = require("path");
import { ExtractFileDir, ExtractFileExt, ExtractFileName, FileExists, IncludeTrailingPathDelimiter } from "../sysutils";

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
    test('ExtractFileExt dirname with dot, filename no dot ', () => {
        expect(ExtractFileExt(path.resolve("path1.path2", "Nothing"))).toEqual("");
    });
    test('ExtractFileExt dirname with dot, filename with dot ', () => {
        expect(ExtractFileExt(path.resolve("path1.path2", "Nothing.ext"))).toEqual("ext");
    });
});
