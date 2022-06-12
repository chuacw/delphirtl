import path from "path";
import { ExtractFileExt } from "./sysutils";

ExtractFileExt("Nothing");
ExtractFileExt(path.resolve("path1.path2", "Nothing"))