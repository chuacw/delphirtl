[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / ExtractFileDir

# Function: ExtractFileDir()

> **ExtractFileDir**(`AFileNameOrPath`): `string`

Extracts the drive and directory parts from AFileName.
Regardless of whether AFileName is a path or filename,
this routine returns the path up to the last path.sep
eg, AFileName contains K:\\Development\\TypeScript\\delphirtl\\tests
the result is K:\\Development\\TypeScript\\delphirtl

## Parameters

• **AFileNameOrPath**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:283](https://github.com/chuacw/delphirtl/blob/fec3f5d663dd7c36654525a8693564dece7e3b0d/src/sysutils.ts#L283)
