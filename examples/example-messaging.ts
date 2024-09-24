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

const index12 = lMgr.subscribeToMessage(Date, (aMessage: Date)=>{
    console.log(aMessage.toUTCString());
})
lMgr.sendMessage(Date, new Date());

const index1 = lMgr.subscribeToMessage(Date, (aMessage: Date)=>{
    console.log(aMessage.toUTCString());
})
lMgr.sendMessage(Date, new Date());
console.log("Message 1 sent!")

const index2 = lMgr.subscribeToMessage(TMyKeys, (aMessage: TMyKeys)=> {
    console.log('fString: ', aMessage.fString);
    console.log('fNumber: ', aMessage.fNumber);
})
lMgr.sendMessage(TMyKeys, new TMyKeys(10, "hey 10!"))
console.log("Message 2 sent!")

const index3 = lMgr.subscribeToWrappedMessage(Date, (aMessage: TMessage<Date>)=>{
    console.log("The wrapped date is : ", aMessage.value.toUTCString());
})
lMgr.sendWrappedMessage(Date, new TMessage(new Date()));
console.log("Message 3 sent!")
lMgr.unsubscribeWrappedMessage(Date, index3); // no more messages can be received after unsubscribing
lMgr.sendWrappedMessage(Date, new TMessage(new Date()));
