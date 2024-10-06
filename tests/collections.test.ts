import { Tree, SEmptyIterables, List } from "../src/collections";
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

    test('List<number> add and indexOf', () => {
        const numberList = new List<number>();
        numberList.add(1);
        let index = numberList.indexOf(1);
        expect(index).toEqual(0);
        numberList.add(2);
        index = numberList.indexOf(2);
        expect(index).toEqual(1);
    });

    test('List<function> add, indexOf, delete', () => {
        const fnList = new List<EventListener>();
        function event1(event: Event) {}
        function event2(event: Event) {}
        fnList.add(event1);
        fnList.add(event2);
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
