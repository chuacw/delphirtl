import { TMessage, TMessageManager } from "../src/messaging";

describe('testing Messaging library', () => {
    test('getDefaultManager returns a manager', () => {
        const lMgr = TMessageManager.getDefaultManager();
        expect(lMgr != undefined).toEqual(true);
    })

    test('Subscribe throws on Number type when not enabled', () => {
        expect(() => {
            const lMgr = TMessageManager.getDefaultManager();
            lMgr.subscribeToMessage2(Number.name, (aMessage: number) => { });
        }).toThrow("Number not enabled");
    });

    test("Subscribe doesn't throw on Number type when enabled", () => {
        expect(() => {
            const lMgr = TMessageManager.getDefaultManager();
            let lNumberEnabled = false;
            lMgr.enableType(Number.name);
            lMgr.subscribeToMessage2(Number.name, (aMessage: number) => { });
        }).not.toThrow("Number not enabled");
    });

    test("Send message is successful on Number when enabled", () => {
        const lMgr = TMessageManager.getDefaultManager();
        let lNumberEnabled = false;
        lMgr.enableType(Number.name);
        lMgr.subscribeToMessage2(Number.name, (aMessage: number) => {
            lNumberEnabled = true;
        });
        lMgr.sendMessage2(Number.name, 5);
        expect(lNumberEnabled).toEqual(true);
    });

});
