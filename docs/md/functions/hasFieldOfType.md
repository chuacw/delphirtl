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

[src/sysutils.ts:187](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/sysutils.ts#L187)