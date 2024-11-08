[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / extractFileName

# Function: extractFileName()

> **extractFileName**(`AFileName`): `string`

Extracts the name and extension parts of a file name.

The resulting string is the rightmost characters of FileName, starting with the first character after the colon or backslash that separates the path information from the name and extension. The resulting string is equal to FileName, if FileName contains no drive and directory parts.

## Parameters

• **AFileName**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:73](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/sysutils.ts#L73)
