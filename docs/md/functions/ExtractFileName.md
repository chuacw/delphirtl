[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / ExtractFileName

# Function: ExtractFileName()

> **ExtractFileName**(`AFileName`): `string`

Extracts the name and extension parts of a file name.

The resulting string is the rightmost characters of FileName, starting with the first character after the colon or backslash that separates the path information from the name and extension. The resulting string is equal to FileName, if FileName contains no drive and directory parts.

## Parameters

• **AFileName**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:73](https://github.com/chuacw/delphirtl/blob/88492fbb2ae6ff649ca664adf641bd7af7998170/src/sysutils.ts#L73)
