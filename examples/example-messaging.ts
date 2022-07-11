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

const index11 = lMgr.subscribeToMessage2(Date, (aMessage: Date)=>{
    console.log(aMessage.toUTCString());
})
lMgr.sendMessage2(Date, new TMessage(new Date()));

const index8 = lMgr.subscribeToMessage2(TMyKeys, (aMessage: TMyKeys)=> {
    console.log('fString: ', aMessage.fString);
    console.log('fNumber: ', aMessage.fNumber);
})
lMgr.sendMessage2(TMyKeys, new TMyKeys(10, "hey 10!"))
