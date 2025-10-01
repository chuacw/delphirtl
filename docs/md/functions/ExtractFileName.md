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

[src/sysutils.ts:319](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/sysutils.ts#L319)
