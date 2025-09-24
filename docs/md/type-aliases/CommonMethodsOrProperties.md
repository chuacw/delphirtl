[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / CommonMethodsOrProperties

# Type Alias: CommonMethodsOrProperties\<A, B\>

> **CommonMethodsOrProperties**\<`A`, `B`\>: \{ \[P in keyof A & keyof B\]: A\[P\] \| B\[P\] \}

Declares a type that extracts common properties or methods of two classes.
Usage: "type CommonType = CommonMethodsOrProperties<ClassA, ClassB>;"
To use on multiple classes, nest the definitions: "CommonMethodsOrProperties<ClassA, CommonMethodsOrProperties<ClassB, ClassC>>;"

## Type Parameters

• **A** *extends* `object`

extends {}

• **B** *extends* `object`

extends {}

## Defined in

[src/rtl.ts:16](https://github.com/chuacw/delphirtl/blob/01752da42abbae178d000244800240d96a86d86e/src/rtl.ts#L16)
