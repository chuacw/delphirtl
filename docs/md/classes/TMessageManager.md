[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / TMessageManager

# Class: TMessageManager

TMessageManager enables messaging between different code points.

 TMessageManager

## Constructors

### new TMessageManager()

> **new TMessageManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:124](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L124)

## Messaging

### sendMessage()

> **sendMessage**\<`T`\>(`aClass`, `aMessage`): `void`

Sends the given message to listeners that subscribes to the given class.

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessage**: `T`

#### Returns

`void`

#### Defined in

[src/messaging.ts:181](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L181)

***

### subscribeToMessage()

> **subscribeToMessage**\<`T`\>(`aClass`, `aMessageListener`): `number`

Subscribes to the given class and receives the given message

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessageListener**

#### Returns

`number`

#### Defined in

[src/messaging.ts:227](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L227)

***

### unsubscribe()

> **unsubscribe**(`aClass`, `aSubscriptionIndex`): `void`

Unsubscribes from messages on the given class

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:269](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L269)

***

### unsubscribeWrappedMessage()

> **unsubscribeWrappedMessage**(`aClass`, `aSubscriptionIndex`): `void`

Unsubscribes from the wrapped message on the given class

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:288](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L288)

## Other

### disableType()

> **disableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:135](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L135)

***

### enableType()

> **enableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:140](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L140)

***

### ensureTypeEnabled()

> **ensureTypeEnabled**(`aSuffix`): `void`

#### Parameters

• **aSuffix**: `string`

#### Returns

`void`

#### Defined in

[src/messaging.ts:153](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L153)

***

### reset()

> **reset**(): `void`

#### Returns

`void`

#### Defined in

[src/messaging.ts:128](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L128)

***

### sendWrappedMessage()

> **sendWrappedMessage**\<`T`\>(`aClass`, `aMessage`): `void`

Sends a wrapped message to listeners on the given class

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessage**: [`TMessage`](TMessage.md)\<`T`\>

#### Returns

`void`

#### Defined in

[src/messaging.ts:203](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L203)

***

### subscribeToWrappedMessage()

> **subscribeToWrappedMessage**\<`T`\>(`aClass`, `aMessageListener`): `number`

Subscribes to the wrapped message on the given class

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessageListener**

#### Returns

`number`

#### Defined in

[src/messaging.ts:248](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L248)

***

### typesDisabled()

> **typesDisabled**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/messaging.ts:161](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L161)

***

### getDefaultManager()

> `static` **getDefaultManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:165](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/messaging.ts#L165)
