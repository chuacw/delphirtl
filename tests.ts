import assert from "assert";
import path from "path";
import { ExtractFileDir, ExtractFileExt, ExtractFileName, FileExists, IncludeTrailingPathDelimiter } from "./sysutils";

assert(IncludeTrailingPathDelimiter("path")=="path"+path.sep);
assert(IncludeTrailingPathDelimiter("path"+path.sep)=="path"+path.sep);

assert(FileExists("nothing.pas") == false, "FileExists failed");
assert(FileExists(__filename), `${__filename} doesn't exist.`);

assert(ExtractFileDir("Nothing.pas") == "", "ExtractFileDir: directory should be empty");
assert(ExtractFileDir(path.resolve(__dirname, "Nothing.pas")) == __dirname);

assert(ExtractFileExt("Nothing.pas") == "pas", "ExtractFileExt should return pas");

assert(ExtractFileName("Nothing.pas") == "Nothing.pas", "ExtractFileName should return Nothing.pas");
