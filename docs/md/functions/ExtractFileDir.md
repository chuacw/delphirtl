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

[src/sysutils.ts:283](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/sysutils.ts#L283)
