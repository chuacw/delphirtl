/*
* 
*
*/
import { TMessage, TMessageManager } from "../src/messaging";

class TMyKeys {
    fNumber: number
    fString: string
    constructor(aNumber: number, aString: string) {
        this.fNumber = (aNumber)?aNumber:0;
        this.fString = (aString)?aString:"";
    }
}

class TMyKeys2 {
    v1: string
    v2: number
    constructor(av1: string, av2: number) {this.v1 = av1, this.v2 = av2}
}

const lMgr = TMessageManager.getDefaultManager();

const index12 = lMgr.subscribeToMessage2(Date, (aMessage: Date)=>{
    console.log(aMessage.toUTCString());
})
lMgr.sendMessage2(Date, new Date());

const index11 = lMgr.subscribeToMessage(Date, (aMessage: TMessage<Date>)=>{
    console.log(aMessage.value.toUTCString());
})
lMgr.sendMessage(TMessage<Date>, new TMessage(new Date()));

const index8 = lMgr.subscribeToMessage(TMyKeys, (aMessage: TMessage<TMyKeys>)=> {
    console.log('fString: ', aMessage.value.fString);
    console.log('fNumber: ', aMessage.value.fNumber);
})
lMgr.sendMessage(TMessage<TMyKeys>, new TMessage(new TMyKeys(10, "hey 10!")))
const index7 = lMgr.subscribeToMessage<TMyKeys>(TMyKeys, (aMessage: TMessage<TMyKeys>)=> {
    console.log('fString: ', aMessage.value.fString);
    console.log('fNumber: ', aMessage.value.fNumber);
})
const index1 = lMgr.subscribeToMessage(TMyKeys, (aMessage: TMessage<TMyKeys>)=> {
    console.log('fString: ', aMessage.value.fString);
    console.log('fNumber: ', aMessage.value.fNumber);
})
lMgr.enableType(Number.name);
const index2 = lMgr.subscribeToMessage(Number, (aMessage: TMessage<number>) => {
    console.log(aMessage.value);
})
const index3 = lMgr.subscribeToMessage(String, (aMessage: TMessage<string>) => {
    console.log(aMessage.value);
})
const index4 = lMgr.subscribeToMessage(Boolean, (aMessage: TMessage<boolean>) => {
    console.log(aMessage.value)
})
const index5 = lMgr.subscribeToMessage(TMyKeys, (aMessage: TMessage<TMyKeys>) => {
    console.log(aMessage.value)
})

lMgr.sendMessage(TMessage<TMyKeys>, new TMessage(new TMyKeys(5, "hey")))
lMgr.sendMessage(TMessage<Number>, new TMessage(5));
lMgr.sendMessage(TMessage<String>, new TMessage("hello world"));
lMgr.unsubscribe2(String, index2);
lMgr.sendMessage(TMessage<String>, new TMessage("hello world again"));
// lMgr.sendMessage2(TMessage<Number>, new TMessage(true)); // fails to compile, which is correct
lMgr.sendMessage(TMessage<Boolean>, new TMessage(true));
lMgr.sendMessage(TMessage<Object>, new TMessage({ val: 5 })); // no listener
lMgr.sendMessage(TMessage<TMyKeys>, new TMessage({ fNumber: 6, fString: "blah" })); // treated as object, so, no listeners
