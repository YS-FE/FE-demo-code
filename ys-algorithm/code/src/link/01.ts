
interface Node<T> {
    data: T;
    next: Node<T>
}

interface NodeD<T> {
    data: T;
    next: NodeD<T>,
    prev: NodeD<T>
}

/**
 * @desc 翻转单链表
 * @param head 
 */
function reverseLink<T> (head: Node<T>): Node<T> {
    if (head == null || head.next == null) {
        return head;
    }

    let prev = head;
    let cur = head.next;
    let temp = head.next.next;

    while (cur) {
        temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
    }

    head.next = null;
    return prev;
}


/**
 * @desc 翻转双向链表
 * @param head 
 */
function reverseLink2<T> (head: NodeD<T>): NodeD<T> {
    if (head == null || head.next == null) {
        return head;
    }

    let prev = head;
    let cur = head.next;
    let temp = head.next.next;

    while (cur) {
        temp = cur.next;
        cur.next = prev;
        cur.prev = temp;
        prev = cur;
        cur = temp;
    }

    head.next = null;
    return prev;
}



/**
 * @desc 单链表是否有环
 * @param head 
 * 快慢指针相遇，就可判断有环
 */
function isCircleLink<T> (head: Node<T>): boolean {
    if (head == null || head.next == null || head.next.next == null) {
        return false;
    }

    let slowNode = head;
    let fastNode = head.next;

    while (fastNode.next && fastNode.next.next) {
        slowNode = slowNode.next;
        fastNode = fastNode.next.next;

        if (slowNode == fastNode) {
            return true;
        }
    }

    return false;
}


/**
 * 删除倒数第k个节点
 * @param head 
 * @param k 
 */
function deleteNode<T> (head: Node<T>, k: number): Node<T> {
    if (head == null || head.next == null) {
        return head;
    }

    let cur = head;
    while (cur) {
        k--;
        cur = cur.next;
    }

    if (k == 0) {
        head = head.next;
    }

    if (k < 0) {
        cur = head;
        while (++k != 0) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
    }

    return head;
}


export default {};