[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Worker

# Class: Worker

The `Worker` class represents an independent JavaScript execution thread.
Most Node.js APIs are available inside of it.

Notable differences inside a Worker environment are:

* The `process.stdin`, `process.stdout`, and `process.stderr` streams may be redirected by the parent thread.
* The `import { isMainThread } from 'node:worker_threads'` variable is set to `false`.
* The `import { parentPort } from 'node:worker_threads'` message port is available.
* `process.exit()` does not stop the whole program, just the single thread,
and `process.abort()` is not available.
* `process.chdir()` and `process` methods that set group or user ids
are not available.
* `process.env` is a copy of the parent thread's environment variables,
unless otherwise specified. Changes to one copy are not visible in other
threads, and are not visible to native add-ons (unless `worker.SHARE_ENV` is passed as the `env` option to the `Worker` constructor). On Windows, unlike the main thread, a copy of the
environment variables operates in a case-sensitive manner.
* `process.title` cannot be modified.
* Signals are not delivered through `process.on('...')`.
* Execution may stop at any point as a result of `worker.terminate()` being invoked.
* IPC channels from parent processes are not accessible.
* The `trace_events` module is not supported.
* Native add-ons can only be loaded from multiple threads if they fulfill `certain conditions`.

Creating `Worker` instances inside of other `Worker`s is possible.

Like [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) and the `node:cluster module`, two-way communication
can be achieved through inter-thread message passing. Internally, a `Worker` has
a built-in pair of `MessagePort` s that are already associated with each
other when the `Worker` is created. While the `MessagePort` object on the parent
side is not directly exposed, its functionalities are exposed through `worker.postMessage()` and the `worker.on('message')` event
on the `Worker` object for the parent thread.

To create custom messaging channels (which is encouraged over using the default
global channel because it facilitates separation of concerns), users can create
a `MessageChannel` object on either thread and pass one of the`MessagePort`s on that `MessageChannel` to the other thread through a
pre-existing channel, such as the global one.

See `port.postMessage()` for more information on how messages are passed,
and what kind of JavaScript values can be successfully transported through
the thread barrier.

```js
import assert from 'node:assert';
import {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort,
} from 'node:worker_threads';
if (isMainThread) {
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('the worker is sending this');
    value.hereIsYourPort.close();
  });
}
```

## Since

v10.5.0

## Extends

- `EventEmitter`

## Constructors

### new Worker()

> **new Worker**(`filename`, `options`?): [`Worker`](Worker.md)

#### Parameters

• **filename**: `string` \| `URL`

The path to the Worker’s main script or module.
                 Must be either an absolute path or a relative path (i.e. relative to the current working directory) starting with ./ or ../,
                 or a WHATWG URL object using file: protocol. If options.eval is true, this is a string containing JavaScript code rather than a path.

• **options?**: `WorkerOptions`

#### Returns

[`Worker`](Worker.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:405

## Properties

### performance

> `readonly` **performance**: `WorkerPerformance`

An object that can be used to query performance information from a worker
instance. Similar to `perf_hooks.performance`.

#### Since

v15.1.0, v14.17.0, v12.22.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:399

***

### resourceLimits?

> `readonly` `optional` **resourceLimits**: `ResourceLimits`

Provides the set of JS engine resource constraints for this Worker thread.
If the `resourceLimits` option was passed to the `Worker` constructor,
this matches its values.

If the worker has stopped, the return value is an empty object.

#### Since

v13.2.0, v12.16.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:393

***

### stderr

> `readonly` **stderr**: `Readable`

This is a readable stream which contains data written to `process.stderr` inside the worker thread. If `stderr: true` was not passed to the `Worker` constructor, then data is piped to the
parent thread's `process.stderr` stream.

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:377

***

### stdin

> `readonly` **stdin**: `null` \| `Writable`

If `stdin: true` was passed to the `Worker` constructor, this is a
writable stream. The data written to this stream will be made available in
the worker thread as `process.stdin`.

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:365

***

### stdout

> `readonly` **stdout**: `Readable`

This is a readable stream which contains data written to `process.stdout` inside the worker thread. If `stdout: true` was not passed to the `Worker` constructor, then data is piped to the
parent thread's `process.stdout` stream.

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:371

***

### threadId

> `readonly` **threadId**: `number`

An integer identifier for the referenced thread. Inside the worker thread,
it is available as `import { threadId } from 'node:worker_threads'`.
This value is unique for each `Worker` instance inside a single process.

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:384

***

### captureRejections

> `static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

#### Since

v13.4.0, v12.16.0

#### Inherited from

`EventEmitter.captureRejections`

#### Defined in

node\_modules/@types/node/events.d.ts:459

***

### captureRejectionSymbol

> `readonly` `static` **captureRejectionSymbol**: *typeof* [`captureRejectionSymbol`](Worker.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

#### Since

v13.4.0, v12.16.0

#### Inherited from

`EventEmitter.captureRejectionSymbol`

#### Defined in

node\_modules/@types/node/events.d.ts:452

***

### defaultMaxListeners

> `static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners` property
can be used. If this value is not a positive number, a `RangeError` is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_ `EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single
`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()` methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

#### Since

v0.11.2

#### Inherited from

`EventEmitter.defaultMaxListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:498

***

### errorMonitor

> `readonly` `static` **errorMonitor**: *typeof* [`errorMonitor`](Worker.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'` events. Listeners installed using this symbol are called before the regular `'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an `'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

#### Since

v13.6.0, v12.17.0

#### Inherited from

`EventEmitter.errorMonitor`

#### Defined in

node\_modules/@types/node/events.d.ts:445

## Methods

### \[captureRejectionSymbol\]()?

> `optional` **\[captureRejectionSymbol\]**\<`K`\>(`error`, `event`, ...`args`): `void`

#### Type Parameters

• **K**

#### Parameters

• **error**: `Error`

• **event**: `string` \| `symbol`

• ...**args**: `AnyRest`

#### Returns

`void`

#### Inherited from

`EventEmitter.[captureRejectionSymbol]`

#### Defined in

node\_modules/@types/node/events.d.ts:136

***

### addListener()

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

Alias for `emitter.on(eventName, listener)`.

##### Parameters

• **event**: `"error"`

• **listener**

##### Returns

`this`

##### Since

v0.1.26

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:459

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:460

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:461

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:462

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:463

#### addListener(event, listener)

> **addListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.addListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:464

***

### emit()

#### emit(event, err)

> **emit**(`event`, `err`): `boolean`

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

##### Parameters

• **event**: `"error"`

• **err**: `Error`

##### Returns

`boolean`

##### Since

v0.1.26

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:465

#### emit(event, exitCode)

> **emit**(`event`, `exitCode`): `boolean`

##### Parameters

• **event**: `"exit"`

• **exitCode**: `number`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:466

#### emit(event, value)

> **emit**(`event`, `value`): `boolean`

##### Parameters

• **event**: `"message"`

• **value**: `any`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:467

#### emit(event, error)

> **emit**(`event`, `error`): `boolean`

##### Parameters

• **event**: `"messageerror"`

• **error**: `Error`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:468

#### emit(event)

> **emit**(`event`): `boolean`

##### Parameters

• **event**: `"online"`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:469

#### emit(event, args)

> **emit**(`event`, ...`args`): `boolean`

##### Parameters

• **event**: `string` \| `symbol`

• ...**args**: `any`[]

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:470

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

#### Since

v6.0.0

#### Inherited from

`EventEmitter.eventNames`

#### Defined in

node\_modules/@types/node/events.d.ts:922

***

### getHeapSnapshot()

> **getHeapSnapshot**(): `Promise`\<`Readable`\>

Returns a readable stream for a V8 snapshot of the current state of the Worker.
See `v8.getHeapSnapshot()` for more details.

If the Worker thread is no longer running, which may occur before the `'exit' event` is emitted, the returned `Promise` is rejected
immediately with an `ERR_WORKER_NOT_RUNNING` error.

#### Returns

`Promise`\<`Readable`\>

A promise for a Readable Stream containing a V8 heap snapshot

#### Since

v13.9.0, v12.17.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:458

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Worker.md#defaultmaxlisteners).

#### Returns

`number`

#### Since

v1.0.0

#### Inherited from

`EventEmitter.getMaxListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:774

***

### listenerCount()

> **listenerCount**\<`K`\>(`eventName`, `listener`?): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Type Parameters

• **K**

#### Parameters

• **eventName**: `string` \| `symbol`

The name of the event being listened for

• **listener?**: `Function`

The event handler function

#### Returns

`number`

#### Since

v3.2.0

#### Inherited from

`EventEmitter.listenerCount`

#### Defined in

node\_modules/@types/node/events.d.ts:868

***

### listeners()

> **listeners**\<`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Type Parameters

• **K**

#### Parameters

• **eventName**: `string` \| `symbol`

#### Returns

`Function`[]

#### Since

v0.1.26

#### Inherited from

`EventEmitter.listeners`

#### Defined in

node\_modules/@types/node/events.d.ts:787

***

### off()

#### off(event, listener)

> **off**(`event`, `listener`): `this`

Alias for `emitter.removeListener()`.

##### Parameters

• **event**: `"error"`

• **listener**

##### Returns

`this`

##### Since

v10.0.0

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:501

#### off(event, listener)

> **off**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:502

#### off(event, listener)

> **off**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:503

#### off(event, listener)

> **off**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:504

#### off(event, listener)

> **off**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:505

#### off(event, listener)

> **off**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.off`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:506

***

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

• **event**: `"error"`

• **listener**

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:471

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:472

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:473

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:474

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:475

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:476

***

### once()

#### once(event, listener)

> **once**(`event`, `listener`): `this`

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

• **event**: `"error"`

• **listener**

The callback function

##### Returns

`this`

##### Since

v0.3.0

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:477

#### once(event, listener)

> **once**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:478

#### once(event, listener)

> **once**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:479

#### once(event, listener)

> **once**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:480

#### once(event, listener)

> **once**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:481

#### once(event, listener)

> **once**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:482

***

### postMessage()

> **postMessage**(`value`, `transferList`?): `void`

Send a message to the worker that is received via `require('node:worker_threads').parentPort.on('message')`.
See `port.postMessage()` for more details.

#### Parameters

• **value**: `any`

• **transferList?**: readonly `TransferListItem`[]

#### Returns

`void`

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:411

***

### postMessageToThread()

#### postMessageToThread(threadId, value, timeout)

> **postMessageToThread**(`threadId`, `value`, `timeout`?): `Promise`\<`void`\>

Sends a value to another worker, identified by its thread ID.

##### Parameters

• **threadId**: `number`

The target thread ID. If the thread ID is invalid, a `ERR_WORKER_MESSAGING_FAILED` error will be thrown.
If the target thread ID is the current thread ID, a `ERR_WORKER_MESSAGING_SAME_THREAD` error will be thrown.

• **value**: `any`

The value to send.

• **timeout?**: `number`

Time to wait for the message to be delivered in milliseconds. By default it's `undefined`, which means wait forever.
If the operation times out, a `ERR_WORKER_MESSAGING_TIMEOUT` error is thrown.

##### Returns

`Promise`\<`void`\>

##### Since

v22.5.0

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:423

#### postMessageToThread(threadId, value, transferList, timeout)

> **postMessageToThread**(`threadId`, `value`, `transferList`, `timeout`?): `Promise`\<`void`\>

##### Parameters

• **threadId**: `number`

• **value**: `any`

• **transferList**: readonly `TransferListItem`[]

• **timeout?**: `number`

##### Returns

`Promise`\<`void`\>

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:424

***

### prependListener()

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

• **event**: `"error"`

• **listener**

The callback function

##### Returns

`this`

##### Since

v6.0.0

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:483

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:484

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:485

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:486

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:487

#### prependListener(event, listener)

> **prependListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:488

***

### prependOnceListener()

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

• **event**: `"error"`

• **listener**

The callback function

##### Returns

`this`

##### Since

v6.0.0

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:489

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:490

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:491

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:492

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:493

#### prependOnceListener(event, listener)

> **prependOnceListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.prependOnceListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:494

***

### rawListeners()

> **rawListeners**\<`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Type Parameters

• **K**

#### Parameters

• **eventName**: `string` \| `symbol`

#### Returns

`Function`[]

#### Since

v9.4.0

#### Inherited from

`EventEmitter.rawListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:818

***

### ref()

> **ref**(): `void`

Opposite of `unref()`, calling `ref()` on a previously `unref()`ed worker does _not_ let the program exit if it's the only active handle left (the default
behavior). If the worker is `ref()`ed, calling `ref()` again has
no effect.

#### Returns

`void`

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:436

***

### removeAllListeners()

> **removeAllListeners**(`eventName`?): `this`

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

• **eventName?**: `string` \| `symbol`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitter.removeAllListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:758

***

### removeListener()

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

• **event**: `"error"`

• **listener**

##### Returns

`this`

##### Since

v0.1.26

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:495

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:496

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:497

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"messageerror"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:498

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `"online"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:499

#### removeListener(event, listener)

> **removeListener**(`event`, `listener`): `this`

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.removeListener`

##### Defined in

node\_modules/@types/node/worker\_threads.d.ts:500

***

### setMaxListeners()

> **setMaxListeners**(`n`): `this`

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

• **n**: `number`

#### Returns

`this`

#### Since

v0.3.5

#### Inherited from

`EventEmitter.setMaxListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:768

***

### terminate()

> **terminate**(): `Promise`\<`number`\>

Stop all JavaScript execution in the worker thread as soon as possible.
Returns a Promise for the exit code that is fulfilled when the `'exit' event` is emitted.

#### Returns

`Promise`\<`number`\>

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:448

***

### unref()

> **unref**(): `void`

Calling `unref()` on a worker allows the thread to exit if this is the only
active handle in the event system. If the worker is already `unref()`ed calling `unref()` again has no effect.

#### Returns

`void`

#### Since

v10.5.0

#### Defined in

node\_modules/@types/node/worker\_threads.d.ts:442

***

### addAbortListener()

> `static` **addAbortListener**(`signal`, `resource`): `Disposable`

**`Experimental`**

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from 'node:events';

function example(signal) {
  let disposable;
  try {
    signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

#### Parameters

• **signal**: `AbortSignal`

• **resource**

#### Returns

`Disposable`

Disposable that removes the `abort` listener.

#### Since

v20.5.0

#### Inherited from

`EventEmitter.addAbortListener`

#### Defined in

node\_modules/@types/node/events.d.ts:437

***

### getEventListeners()

> `static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

• **emitter**: `EventEmitter`\<`DefaultEventMap`\> \| `EventTarget`

• **name**: `string` \| `symbol`

#### Returns

`Function`[]

#### Since

v15.2.0, v14.17.0

#### Inherited from

`EventEmitter.getEventListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:358

***

### getMaxListeners()

> `static` **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

• **emitter**: `EventEmitter`\<`DefaultEventMap`\> \| `EventTarget`

#### Returns

`number`

#### Since

v19.9.0

#### Inherited from

`EventEmitter.getMaxListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:387

***

### ~~listenerCount()~~

> `static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName` registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

• **emitter**: `EventEmitter`\<`DefaultEventMap`\>

The emitter to query

• **eventName**: `string` \| `symbol`

The event name

#### Returns

`number`

#### Since

v0.9.12

#### Deprecated

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

`EventEmitter.listenerCount`

#### Defined in

node\_modules/@types/node/events.d.ts:330

***

### on()

#### on(emitter, eventName, options)

> `static` **on**(`emitter`, `eventName`, `options`?): `AsyncIterator`\<`any`[], `any`, `any`\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
  ee.emit('close');
});

for await (const event of on(ee, 'foo', { close: ['close'] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log('done'); // prints 'done'
```

##### Parameters

• **emitter**: `EventEmitter`\<`DefaultEventMap`\>

• **eventName**: `string` \| `symbol`

• **options?**: `StaticEventEmitterIteratorOptions`

##### Returns

`AsyncIterator`\<`any`[], `any`, `any`\>

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

##### Since

v13.6.0, v12.16.0

##### Inherited from

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/events.d.ts:303

#### on(emitter, eventName, options)

> `static` **on**(`emitter`, `eventName`, `options`?): `AsyncIterator`\<`any`[], `any`, `any`\>

##### Parameters

• **emitter**: `EventTarget`

• **eventName**: `string`

• **options?**: `StaticEventEmitterIteratorOptions`

##### Returns

`AsyncIterator`\<`any`[], `any`, `any`\>

##### Inherited from

`EventEmitter.on`

##### Defined in

node\_modules/@types/node/events.d.ts:308

***

### once()

#### once(emitter, eventName, options)

> `static` **once**(`emitter`, `eventName`, `options`?): `Promise`\<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

##### Parameters

• **emitter**: `EventEmitter`\<`DefaultEventMap`\>

• **eventName**: `string` \| `symbol`

• **options?**: `StaticEventEmitterOptions`

##### Returns

`Promise`\<`any`[]\>

##### Since

v11.13.0, v10.16.0

##### Inherited from

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/events.d.ts:217

#### once(emitter, eventName, options)

> `static` **once**(`emitter`, `eventName`, `options`?): `Promise`\<`any`[]\>

##### Parameters

• **emitter**: `EventTarget`

• **eventName**: `string`

• **options?**: `StaticEventEmitterOptions`

##### Returns

`Promise`\<`any`[]\>

##### Inherited from

`EventEmitter.once`

##### Defined in

node\_modules/@types/node/events.d.ts:222

***

### setMaxListeners()

> `static` **setMaxListeners**(`n`?, ...`eventTargets`?): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

• **n?**: `number`

A non-negative number. The maximum number of listeners per `EventTarget` event.

• ...**eventTargets?**: (`EventEmitter`\<`DefaultEventMap`\> \| `EventTarget`)[]

Zero or more {EventTarget} or {EventEmitter} instances. If none are specified, `n` is set as the default max for all newly created {EventTarget} and {EventEmitter}
objects.

#### Returns

`void`

#### Since

v15.4.0

#### Inherited from

`EventEmitter.setMaxListeners`

#### Defined in

node\_modules/@types/node/events.d.ts:402
