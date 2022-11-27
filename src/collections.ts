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
    public static createTree<T>(nodeValues: Iterable<T>): PTreeNode<T> {
        let root: PTreeNode<T> = null;
        for (const nodeValue of nodeValues) {
            root = insertNode(root, nodeValue);
        }
        return root!;
    }

    // should only be called when this is the root, otherwise, it'll return the wrong values
    get height(): number {
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

function createTree<T>(nodeValues: Iterable<T>): PTreeNode<T> {
    let root: PTreeNode<T> = null;
    for (const nodeValue of nodeValues) {
        root = insertNode(root, nodeValue);
    }
    return root!;
}

// see https://www.baeldung.com/cs/binary-tree-height
function height<T>(root: PTreeNode<T>): number {
    if(root === null)
        return -1;
    const result = 1+Math.max(height(root.left), height(root.right));
    return result;
}


export {
    Queue, Dictionary, TreeNode as Tree, TreeNode
}