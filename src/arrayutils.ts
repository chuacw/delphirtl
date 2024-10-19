function dedupArray(values: any[]): any[] {
    const result = Array.from(new Set(values));
    return result;
}

function maxLen(values: string[]): number {
    let result = 0;
    for (const value of values) {
        if (value.length > result) {
            result = value.length;
        }
    }
    return result;
}

function sort(values: string[], ascending: boolean = true): string[] {
    let result = [...values];
    if (ascending) {
        result.sort((a, b) => a.localeCompare(b)); // descending order
    } else {
        result.sort((a, b) => b.localeCompare(a)); // descending order
    }
    return result;
}

/**
 * Compare all elements of arr1 and arr2 and ensure they have no duplicates
 * @param arr1 
 * @param arr2 
 * @param key  
 * @returns true if there's duplicates, false otherwise
 */
function haveNoDuplicates(arr1: any[], arr2: any[], key: string): boolean {
    if ((arr1.length === 0) && (arr2.length === 0)) {
        return false;
    }
    return arr1.every(item1 => !arr2.some(item2 => item1[key] === item2[key]));
}


export {
    haveNoDuplicates,
    dedupArray,
    maxLen,
    sort
}
