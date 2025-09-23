[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / ExtractFileName

# Function: ExtractFileName()

> **ExtractFileName**(`AFileName`): `string`

Extracts the name and extension parts of a file name.

The resulting string is the rightmost characters of FileName, starting with the first character after
 the colon or backslash that separates the path information from the name and extension. The resulting 
string is equal to FileName, if FileName contains no drive and directory parts.

## Parameters

• **AFileName**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:318](https://github.com/chuacw/delphirtl/blob/fec3f5d663dd7c36654525a8693564dece7e3b0d/src/sysutils.ts#L318)
