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

export {
    dedupArray,
    maxLen,
    sort
}
