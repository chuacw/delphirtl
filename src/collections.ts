import { strict as assert } from "node:assert";

/**
 * A first in, first out class
 */
class Queue<T> {
    #store: T[] = [];

    /**
     * 
     * @param val Puts the given value into the class
     */
    push(val: T) {
        this.#store.push(val);
    }

    /**
     * 
     * @returns The first value in the store
     */
    pop(): T | undefined {
        return this.next();
    }

    /**
     * 
     * @returns The first value in the store
     */
    next(): T | undefined {
        const result = this.#store.shift();
        return result;
    }

    
    /**
     * The number of values in the store
     *
     * @readonly
     * @type {number}
     */
    get length(): number {
        return this.#store.length;
    }
}


/**
 * A last in, first out class
 */
class Stack<T> {
    #store: T[] = [];

    /**
     * 
     * @param v Puts the given value into the store
     */
    push(v: T) {
        this.#store.push(v);
    }

    /**
     * 
     * @returns The last value that was pushed into the store
     */
    pop(): T | undefined {
        const result = this.#store.pop();
        return result;
    }

    
    /**
     * The number of items in the store
     *
     * @readonly
     * @type {number}
     */
    get length(): number {
        return this.#store.length;
    }
}

class Dictionary<K, V> extends Map<K, V> {
    AddOrSetValue(key: K, value: V) {
        this.set(key, value);
    }

    Add(key: K, value: V) {
        this.set(key, value);
    }

    Clear() {
        this.clear();
    }

    public get Count(): number {
        const result = this.size;
        return result;
    }

    public get count(): number { return this.Count; }

    // private convertToGeneric<K>(value: unknown): K {
    // // Convert value based on the type of K
    // if (typeof value === 'string' && typeof (undefined as K) === 'number') {
    //     // Convert string to number
    //     const numberValue = Number(value);
    //     if (isNaN(numberValue)) {
    //         throw new Error(`Cannot convert '${value}' to type number.`);
    //     }
    //     return numberValue as K; // Type assertion
    // } else if (typeof value === 'number' && typeof (undefined as K) === 'string') {
    //     // Convert number to string
    //     return String(value) as K; // Type assertion
    // }
    //     // Add more conversion logic as needed
    //     return value as K; // Default case (not a valid conversion)
    // }
    
    // public get Items(): { [key: string]: V } {
    //     const items: { [key: string]: V } = {};
    //     this.forEach((value: V, key: K) => {
    //         items[key as any] = value;
    //     });

    //     // in-place of returning items, returns the following
    //     // the following will intercept non-existent indices and
    //     // throw an Error
    //     // Unfortunately, can't declare a class within a class
    //     // so, there's the repeated definition of { [key...]: V }
    //     return new Proxy(items, {
    //         // Intercept 'get' operation
    //         get: (map: { [key: string]: V }, key: string) => {
    //             if (!(key in map)) {
    //                 throw new Error(`Key "${key}" not found.`);
    //             }
    //             return map[key];
    //         },

    //         // Intercept 'set' operation
    //         set: (map: { [key: string]: V }, key: any, value: V): boolean => {
    //             // const [firstKey, _firstValue] = this.entries().next().value;
    //             let k = this.convertToGeneric<K>(key);
    //             this.AddOrSetValue(k, value);  // Update the internal map
    //             return true;  // Indicate success
    //         }
    //     });
    // }

    // public get items(): { [key: string]: V } {
    //     const result = this.Items;
    //     return result;
    // }

    TryGetValue(key: K): {
        found: boolean,
        value: V | undefined
    } {
        const value = this.get(key);
        const found = value !== undefined;
        const result = {found, value};
        return result;
    }

    Contains(key: K): boolean {
        const result = this.has(key);
        return result;
    }

    ContainsValue(value: V): boolean {
        for(const v of this.values()) {
            if (value === v) {
                return true;
            }
        }
        return false;
    }

    TryAdd(key: K, value: V): boolean {
        if (this.Contains(key)) {
            return false;
        }
        this.set(key, value);
        return true;
    }

    Remove(key: K) {
        this.delete(key);
    }
};

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
    find(callback: T): boolean {
        const result = this.items.find((value, index, obj: T[]) => {
            const result = (value == callback);
            return result;
        });
        return result !== undefined;
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