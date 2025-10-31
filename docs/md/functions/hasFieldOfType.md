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

[src/sysutils.ts:490](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/sysutils.ts#L490)
