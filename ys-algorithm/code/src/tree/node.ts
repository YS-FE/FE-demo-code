
class Node {
    public value: any;
    public left: Node;
    public right: Node;

    constructor(value: any) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export  default Node;