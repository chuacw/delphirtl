/*
* A simple messaging system by Chee Wee Chua, Jul 2022
* See examples in ./examples
*
*/

interface IMessageName {
    getName(): string
}
interface IMessage<T> extends IMessageName {
    readonly value: T
}
interface IMessageConstructor<T> {
    new(aValue: T): IMessage<T>
}
abstract class TMessageBase<T> implements IMessage<T>, IMessageName {
    public readonly value: T;
    constructor(aValue: T) {
        this.value = aValue;
    }
    getName(): string {
        return typeof this.value;
    }
}

class TMessage<T> extends TMessageBase<T> {
}

interface ICallback<T> {
    (aMessage: TMessage<T>): void;
}

class TCallback<T> {
    getName() {
        throw new Error("Method not implemented.");
    }
    fCallback: ICallback<T>;
    constructor(aCallback: ICallback<T>) {
        this.fCallback = aCallback;
    }
}

type KeyOf<T> = keyof T;

class TMessageManager {
    private fListeners: Map<any, Array<any>> = new Map();
    private fDisabledTypes: string[] = [];
    private static fDefaultManager: TMessageManager;
 
    constructor() {
        this.fDisabledTypes.push(Number.name);
    }

    sendMessage<T>(aMessageClass: { new(aValue: T): TMessage<T>; prototype: TMessage<T>; }, aMessage: TMessage<T>) {
        const aTClassName = (typeof aMessage.value)!="object"?(typeof aMessage.value).toUpperCase():(aMessage.value as unknown as object).constructor.name.toUpperCase();
        const aMessageClassName = `${aMessage.constructor.name}<${aTClassName}>`
        const lListenerList = this.fListeners.get(aMessageClassName);
        if (lListenerList != undefined) {
            for (const lListener of lListenerList) {
                lListener(aMessage);
            }
        }
    }

    public enableType(aTypeName: string) {
        let index = -1;
        for (let i=0; i<this.fDisabledTypes.length; i++) {
            if (aTypeName == this.fDisabledTypes[i]) {
                index = i; break;
            }
        }
        if (index!=-1) {
            this.fDisabledTypes.splice(index, 1)
        }
    }

    public disableType(aTypeName: string) {
        this.fDisabledTypes.push(aTypeName)
    }

    public typesDisabled(): string[] {
        return this.fDisabledTypes
    }

    public static getDefaultManager(): TMessageManager {
        if (!TMessageManager.fDefaultManager) {
            this.fDefaultManager = new TMessageManager()
        }
        return this.fDefaultManager;
    }

    subscribeToMessage<T extends Date | string | number | boolean | {}>(aClass: Function | string, aMessageListener: (aMessage: TMessage<T>) => void) {
        const lSuffix = (typeof aClass == 'function')?(aClass.name):aClass;
        this.ensureTypeEnabled(lSuffix);
        const aMessageClassName = `${TMessage.name}<${lSuffix.toUpperCase()}>`; // TMessage<Number>, TMessage<String>, TMessage<Date>, 
        let lListenerList = this.fListeners.get(aMessageClassName); // name is erased, so aMessageClass is always TMessage
        if (!lListenerList) {
            lListenerList = new Array();
            this.fListeners.set(aMessageClassName, lListenerList);
        }
        const index = lListenerList.push(aMessageListener) - 1;
        return index;
    }

    subscribeToMessage2<T extends Date | string | number | boolean | {}>(aClass: Function | string, aMessageListener: (aMessage: T) => void) {
        const lSuffix = (typeof aClass == 'function')?(aClass.name):aClass;
        this.ensureTypeEnabled(lSuffix);
        const aMessageClassName = `${lSuffix.toUpperCase()}`;       // TMessage<Number>, TMessage<String>, TMessage<Date>
        let lListenerList = this.fListeners.get(aMessageClassName); // name is erased, so aMessageClass is always TMessage
        if (!lListenerList) {
            lListenerList = new Array();
            this.fListeners.set(aMessageClassName, lListenerList);
        }
        const index = lListenerList.push(aMessageListener) - 1;
        return index;
    }

    sendMessage2<T extends Date | string | number | boolean | {}>(aClass: Function | string, aMessage: T) {
        const aTClassName = (typeof aMessage)!="object"?(typeof aMessage).toUpperCase():(aMessage as unknown as object).constructor.name.toUpperCase();
        const aMessageClassName = `${aTClassName}`
        const lListenerList = this.fListeners.get(aMessageClassName);
        if (lListenerList != undefined) {
            for (const lListener of lListenerList) {
                lListener(aMessage);
            }
        }
    }

    ensureTypeEnabled(aSuffix: string) {
        for(const aType of this.fDisabledTypes) {
            if (aSuffix == aType) {
                throw new Error(`${aSuffix} not enabled`);
            }
        }
    }

    public unsubscribe<T>(aMessageClass: { new(aValue: T): TMessage<T>; prototype: TMessage<T>; getName(): string }, index: number) {
        let lListenerList = this.fListeners.get(aMessageClass)
        if (lListenerList != undefined) {
            lListenerList.splice(index, 1)
            if (lListenerList.length == 0) {
                this.fListeners.delete(aMessageClass);
            }
        }
    }

    unsubscribe2(aClass: Function, index: number) {
        const aMessageClassName = `${TMessage.name}<${aClass.name.toUpperCase()}>`; // TMessage<Number>, TMessage<String>, TMessage<Date>, 
        let lListenerList = this.fListeners.get(aMessageClassName); 
        if (lListenerList != undefined) {
            lListenerList.splice(index, 1)
            if (lListenerList.length == 0) {
                this.fListeners.delete(aMessageClassName);
            }
        }
    }
}

export {
    TMessage,
    TMessageManager
}