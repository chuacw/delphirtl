declare module 'delphirtl/logutils' {
  function log(arg: any): void;
  function info(arg: any): void;
  function error(arg: any): void;
  export { info, error, log };

}
declare module 'delphirtl/rtl' {
  function ParamCount(): number;
  function ParamStr(index: number): string;
  export { ParamCount, ParamStr, ParamCount as getParamCount, ParamStr as getParamStr };

}
declare module 'delphirtl/sysutils' {
  function extractFileDir(AFilename: string): string;
  function extractFileName(AFileName: string): string;
  export { extractFileDir, extractFileName, extractFileDir as ExtractFileDir, extractFileName as ExtractFileName };

}
// declare module 'delphirtl' {
//   // import main = require('delphirtl/index.d');
//   import main = require('delphirtl/');
//   export = main;
// }