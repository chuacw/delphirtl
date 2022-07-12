import { TMessage, TMessageManager } from "../src/messaging";

describe('testing Messaging library', () => {
    beforeEach(()=>{
        const lMgr = TMessageManager.getDefaultManager();
        lMgr.reset();
    });

    test('getDefaultManager returns a manager', () => {
        const lMgr = TMessageManager.getDefaultManager();
        expect(lMgr != undefined).toEqual(true);
    })

    test('Subscribe throws on Number type when not enabled', () => {
        expect(() => {
            const lMgr = TMessageManager.getDefaultManager();
            lMgr.subscribeToMessage(Number.name, (aMessage: number) => { });
        }).toThrow("Number not enabled");
    });

    test("Subscribe doesn't throw on Number type when enabled", () => {
        expect(() => {
            const lMgr = TMessageManager.getDefaultManager();
            let lNumberEnabled = false;
            lMgr.enableType(Number.name);
            lMgr.subscribeToMessage(Number.name, (aMessage: number) => { });
        }).not.toThrow("Number not enabled");
    });

    test("Send message is successful on Number when enabled", () => {
        const lMgr = TMessageManager.getDefaultManager();
        let lNumberEnabled = false;
        lMgr.enableType(Number);
        lMgr.subscribeToMessage(Number.name, (aMessage: number) => {
            lNumberEnabled = true;
        });
        lMgr.sendMessage(Number, 5);
        expect(lNumberEnabled).toEqual(true);
    });

    test("Send message do not send messages to different types/do not cross-talk", () => {
        const lMgr = TMessageManager.getDefaultManager();
        let lMessagesReceived = 0;
        lMgr.enableType(Number);
        lMgr.subscribeToMessage(Number.name, (aMessage: number) => {
            lMessagesReceived+=1
        });
        lMgr.sendMessage(Number, 5);
        lMgr.sendMessage(Date, new Date());
        expect(lMessagesReceived).toEqual(1);
    });

    test(`Subscribe message accept string ID or class`, () => {
        const lMgr = TMessageManager.getDefaultManager();
        let lMessageReceived = "";
        lMgr.subscribeToMessage(String, (aMessage: string) => {
            lMessageReceived+=aMessage
        });
        lMgr.subscribeToMessage(String.name, (aMessage: string) => {
            lMessageReceived+=aMessage
        });
        lMgr.sendMessage(String, "Hello world");
        expect(lMessageReceived).toEqual("Hello worldHello world");
    });

    test("An index is assigned when subscribing", () => {
        const lMgr = TMessageManager.getDefaultManager();
        lMgr.enableType(Number);
        const index = lMgr.subscribeToMessage(Number.name, (aMessage: number) => {
        });
        expect(index).toBeGreaterThanOrEqual(0);
    });

    test("Unsubscribe works on single listener", () => {
        const lMgr = TMessageManager.getDefaultManager();
        lMgr.enableType(Number);
        let lMessagesReceived = 0;
        const index = lMgr.subscribeToMessage(Number.name, (aMessage: number) => {
            lMessagesReceived += aMessage
        });
        lMgr.sendMessage(Number, 1);
        lMgr.unsubscribe(Number.name, index);
        lMgr.sendMessage(Number, 2);
        expect(lMessagesReceived).toEqual(1)
    });

    test("sendMessage performs similarly to sendWrappedMessage", () => {
        const lMgr = TMessageManager.getDefaultManager();
        lMgr.enableType(Number);
        let lMessage1 = 0, lMessage2 = 0;
        lMgr.subscribeToMessage(Number, (aMessage: number) => {
            lMessage1 = aMessage;
        });
        const lValue = 10;
        lMgr.sendMessage(Number, lValue)
        lMgr.subscribeToWrappedMessage(Number, (aMessage: TMessage<number>)=>{
            lMessage2 = aMessage.value;
        })
        lMgr.sendWrappedMessage(Number, new TMessage(lValue));
        expect(lMessage1).toEqual(lMessage2);
    });
});
