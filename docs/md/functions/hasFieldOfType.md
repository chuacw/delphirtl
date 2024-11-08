[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / hasFieldOfType

# Function: hasFieldOfType()

> **hasFieldOfType**\<`T`\>(`obj`, `fieldName`, `fieldType`): `obj is Object`

Checks that obj is an object, and it has a field named fieldName and that its type is fieldType  
Assuming e is an object with the field code of type string.  
* If you use this, then the expression following it is valid, for example:  
  - hasFieldOfType<string>(e, "code", "string") && e.code === "INSUFFICIENT_FUNDS")  
* If you do not use it, then  
  - e.code is invalid when checked by code analyzer

## Type Parameters

• **T**

## Parameters

• **obj**: `unknown`

• **fieldName**: `string`

• **fieldType**: `string`

## Returns

`obj is Object`

## Defined in

[src/sysutils.ts:259](https://github.com/chuacw/delphirtl/blob/8ce65e250c1dfd9fa8a7bbe6d8347fa1cfdad851/src/sysutils.ts#L259)
