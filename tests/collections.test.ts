import { Tree, SEmptyIterables } from "../src/collections";
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

});
