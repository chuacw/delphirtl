import path from "path";

function extractFileDir(AFilename: string): string {
    const result = AFilename.substring(0, AFilename.lastIndexOf(path.sep));
    return result;
}

function extractFileName(AFileName: string): string {
    const result = AFileName.substring(AFileName.lastIndexOf(path.sep)+1);
    return result;
}

export {
    extractFileDir,
    extractFileName
}
