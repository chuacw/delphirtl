import { strict as assert } from "node:assert";

class Queue<T> {
    #store: T[] = [];

    push(val: T) {
        this.#store.push(val);
    }

    pop(): T | undefined {
        return this.#store.shift();
    }

    get length(): number {
        return this.#store.length;
    }
}

class Stack<T> {
    #store: T[] = [];

    push(v: T) {
        this.#store.push(v);
    }

    pop(): T | undefined {
        const result = this.#store.pop();
        return result;
    }

    get length(): number {
        return this.#store.length;
    }
}

type Dictionary<K, V> = Map<K, V>;

type PTreeNode<T> = TreeNode<T> | null;
class TreeNode<T> {
    left: PTreeNode<T>;
    right: PTreeNode<T>;
    data: T;
    
    constructor(value: T) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
    public static createTree<T>(nodeValues: Iterable<T>): TreeNode<T> {
        let root: PTreeNode<T> = null;

        // ensure iterables have at least 1 value
        let count = 0;
        for(const nodeValue of nodeValues) {
            count++;
            break;
        }
        assert(count > 0, SEmptyIterables);

        for (const nodeValue of nodeValues) {
            root = insertNode(root, nodeValue);
        }
        return root!;
    }

    // should only be called when this is the root, otherwise, it'll return the wrong values
    /**
     * Returns the height of the tree. Call only when this is the root.
     * @date 28/11/2022 - 12:38:36 am
     *
     * @public
     * @readonly
     * @type {number} height of the tree
     */
    public get height(): number {
        return height(this);
    }
}

function insertNode<T>(node: PTreeNode<T>, data: T): TreeNode<T> {
    if (node === null) return new TreeNode(data);
    if (data < node.data) {
        node.left = insertNode(node.left, data);
    } else {
        node.right = insertNode(node.right, data);
    }
    return node;
}

const SEmptyIterables = "Iterable do not have any elements!";
function createTree<T>(nodeValues: Iterable<T>): TreeNode<T> {
    let root: PTreeNode<T> = null;

    // ensure iterables have at least 1 value
    let count = 0;
    for(const nodeValue of nodeValues) {
        count++;
        break;
    }
    assert(count > 0, SEmptyIterables);

    for (const nodeValue of nodeValues) {
        root = insertNode(root, nodeValue);
    }
    return root!;
}

// see https://www.baeldung.com/cs/binary-tree-height
function height<T>(root: PTreeNode<T>): number {
    if (root === null) {
        return -1;
    }
    const result = 1+Math.max(height(root.left), height(root.right));
    return result;
}

class List<T> {
    find(callback: T): T | undefined {
        const result = this.items.find((value, index, obj: T[]) => {
            const result = (value == callback);
            return result;
        });
        return result;
    }

    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    /**
     * 
     * @returns Size of the List
     */
    size(): number {
        return this.items.length;
    }

    
    /**
     * Returns the length of this list
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get length(): number {
        return this.items.length;
    }

    /**
     * Adds a value to the list
     * @param value The value to add to the list
     */
    add(value: T): void {
        this.items.push(value);
    }

    indexOf(value: T): number {
        const result = this.items.indexOf(value);
        return result;
    }

    get(index: number): T {
        return this.items[index];
    }

    /**
     * Delete a specified value
     *
     * @type {*}
     */
    delete(value: T): boolean {
        const index = this.items.indexOf(value); 
        if (index !== -1) {  
            this.items.splice(index, 1); 
            return true; 
        }
        return false; 
    }

    /**
     * Removes the specified value
     * @param value 
     * @returns 
     */
    remove(value: T): boolean {
        return this.delete(value);
    }

    // Implementing the iterator
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const items = this.items;

        return {
            next(): IteratorResult<T> {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }

}

export {
    Queue, Dictionary, TreeNode as Tree, TreeNode, Stack, List,
    SEmptyIterables
}