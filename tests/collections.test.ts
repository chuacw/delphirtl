import { Tree, SEmptyIterables, List, Queue, Stack, Dictionary } from "../src/collections";
describe('testing Collections library', () => {

    test('CreateTree fails when given empty iterables', () => {
        expect(() => {
            const nodeValues: number[] = [];
            const tree = Tree.createTree(nodeValues);
            const height = tree?.height;                
        }).toThrow(SEmptyIterables);
    }, 100_000);

    test('CreateTree', () => {
        const nodeValues = "3 5 2 1 4 6 7".split(" ").map((v) => parseInt(v, 10));
        const tree = Tree.createTree(nodeValues);
        expect(tree!.height).toEqual(3);
    });

    test('Dictionary<string, number> - 1', () => {
        const d = new Dictionary<string, number>();
        d.set("hello", 5);
        let value = d.get('hello');
        expect(value).toEqual(5);

        d.set('hello', 6);
        value = d.get('hello');
        expect(value).toBe(6);

        value = d.get('nothing');
        expect(value).toBeUndefined();
    });

    test('Dictionary<string, number> - 2', () => {
        const d = new Dictionary<string, number>();
        d.Add("hello", 5);
        let v = d.get("hello")!;
        expect(v).toEqual(5);

        d.Add('world', 7);
        v = d.get('world')!;
        expect(v).toEqual(7);
    });

    test('Dictionary<number, string> - 3', () => {
        const d = new Dictionary<number, string>();
        d.Add(1, "hello");
        let v = d.get(1)!;
        expect(v).toEqual('hello');

        d.Add(8, 'world');
        v = d.get(8)!;
        expect(v).toEqual('world');

        let key = 9;
        // expect(() => d.get(key)).toThrowError(`Key "${key}" not found.`);
        expect(d.get(key)).toBeFalsy();

        key = 10;
        d.set(key, 'yahoo');
        v = d.get(key)!;
        expect(v).toBe('yahoo');

        let {found, value} = d.TryGetValue(key)!;
        expect(found).toBeTruthy();
        expect(value)!.toBe('yahoo');
    });

    test('Dictionary<string|number, number|string>.Items', () => {
        let d1 = new Dictionary<number, string>();
        d1.Items[5] = 'hello';
        let v1 = d1.Items[5];
        expect(v1).toBe("hello");

        let d2 = new Dictionary<string, number>();
        d2.Items["world"] = 5;
        let v2 = d2.Items["world"];
        expect(v2).toBe(5);

        let el1 = function(event: Event) {}
        let el2 = function(event: Event) {}
        let el3 = function(event: Event) {}
        let d3 = new Dictionary<EventListener, number>();
        d3.set(el1, 9); // can't use Items here, ie, d3.Items[el1] = 9;
        let v3: number = 0;
        expect(() => { v3 = d3.get(el1)!}).not.toThrowError();
        expect(v3).toEqual(9);

        let v4 = d3.get(el2);
        expect(v4).toBeUndefined();
    });

    test('Dictionary<object, string>', () => {
        let d = new Dictionary<object, string>();
        let obj1 = {};
        let obj2 = {};
        
        d.set(obj1, "hello");
        let v1 = d.get(obj1);
        expect(v1).toBe("hello");
        
        let v2 = d.get(obj2);
        expect(v2).toBeUndefined();
    });

    test('List<number> add and indexOf', () => {
        const numberList = new List<number>();
        numberList.add(1);
        let index = numberList.indexOf(1);
        expect(index).toEqual(0);
        numberList.add(2);
        index = numberList.indexOf(2);
        expect(index).toEqual(1);
    });

    test('Queue<number> push, pop, length', () => {
        const q = new Queue<number>();
        q.push(5);
        expect(q.length).toEqual(1);

        q.push(6);
        expect(q.length).toEqual(2);

        let val = q.next();
        expect(val).toEqual(5);

        val = q.next();
        expect(val).toEqual(6);
    });

    test('Stack<number> push, pop, length', () => {
        const stack = new Stack<number>();
        stack.push(5);
        expect(stack.length).toEqual(1);
        stack.push(6);
        expect(stack.length).toEqual(2);
        let val = stack.pop();
        expect(val).toEqual(6);
        val = stack.pop();
        expect(val).toEqual(5);
    });

    test('List<function> add, indexOf, delete', () => {
        const fnList = new List<EventListener>();
        function event1(event: Event) {}
        function event2(event: Event) {}
        function event3(event: Event) {}
        fnList.add(event1);
        fnList.add(event2);

        let found = fnList.find(event2);
        expect(found).toBeTruthy();

        found = fnList.find(event3);
        expect(found).toBeFalsy();

        let index = fnList.indexOf(event2);
        expect(index).toEqual(1);
        index = fnList.indexOf(event1);
        expect(index).toEqual(0);

        fnList.delete(event1);
        let len = fnList.length;
        expect(len).toEqual(1);
        index = fnList.indexOf(event1);
        expect(index).toEqual(-1);
        index = fnList.indexOf(event2);
        expect(index).toEqual(0);
    });

});
