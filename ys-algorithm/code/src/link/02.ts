/**
 * 跳表
 */
export class SkipList<T> {
    // head和tail始终指向最顶层的首位节点，通过链表能访问任何位置
    private head: SkipListNode<T>
    private tail: SkipListNode<T>

    // 索引的层数，0表示最底层
    private levelCount = 0

    // 元素的个数
    private size = 0

    // private readonly MAX_LEVEL = 16


    constructor() {
        this.head = new SkipListNode<T>(SkipListNode.negInf, null)
        this.tail = new SkipListNode<T>(SkipListNode.posInf, null)
    }

    public insert(key: number, value: T): void {
        let p: SkipListNode<T>
        let q: SkipListNode<T>

        let i: number = 0

        // 先查找位置
        p = this.findNode(key)

        // 如果跳跃表中的值已经存在了，直接赋值即可
        if (p.key === key) {
            p.value = value
            return
        }

        // 没有该值，则进行插入操作,应该是插在p节点的右边. p -> q -> ?
        q = new SkipListNode(key, value)
        q.left = p
        q.right = p.right
        if (p.right) {
            p.right.left = q
        }
        p.right = q

        // 再使用随机数决定是否要向更高层攀升
        while (Math.random() < 0.5) {
            // 如果新元素的级别已经达到跳跃表的最大高度，则新建空白层
            if (i >= this.levelCount) {
                this.addEmptyLevel()
            }

            // 从p向左扫描含有高层节点的节点, 方便节点在每一层插入
            while (!p.up) {
                p = p.left!
            }
            p = p.up

            // 新值对应的索引，这里不需要存value了，因为只需要最底层存value即可
            const z = new SkipListNode<T>(key, null)

            z.left = p
            z.right = p.right
            if (p.right) {
                p.right.left = z
            }
            p.right = z

            z.down = q
            q.up = z

            q = z
            i = i + 1
        }
        this.size++
    }

    public get(key: number): T | null {
        const p = this.findNode(key)
        return p.key === key ? p.value : null
    }

    public remove(key: number) {
        let p: SkipListNode<T> | undefined = this.findNode(key)
        if (p.key !== key) return

        while (p != null) {
            p.left!.right = p.right
            p.right!.left = p.left
            p = p.up
        }
    }

    private addEmptyLevel() {

        const p1: SkipListNode<T> = new SkipListNode(SkipListNode.negInf, null)
        const p2: SkipListNode<T> = new SkipListNode(SkipListNode.posInf, null)

        p1.right = p2
        p1.down = this.head

        p2.left = p1
        p2.down = this.tail

        this.head.up = p1
        this.tail.up = p2

        this.head = p1
        this.tail = p2

        this.levelCount++
    }

    private findNode(key: number): SkipListNode<T> {
        const { head } = this
        let p = head
        while (true) {
            // 从左向右查找，直到右节点的key值大于要查找的key值
            while (p.right && p.right.key !== SkipListNode.posInf && p.right.key <= key) {
                p = p.right
            }
            // 如果有更低层的节点，则向低层移动
            if (p.down) {
                p = p.down
            } else {
                break
            }
        }
        // 这里返回的p的key值，是小于等于要找的key值的
        return p
    }
}

export class SkipListNode<T> {
    key: number
    value: T | null
    up?: SkipListNode<T>
    down?: SkipListNode<T>
    left?: SkipListNode<T>
    right?: SkipListNode<T>

    constructor(key: number, value: T | null) {
        this.key = key
        this.value = value
    }

    // 最小的数，无限接近于0，用于表示左标兵
    static negInf: number = Number.MIN_VALUE
    // 最大的数，用于表示右标兵
    static posInf: number = Number.MAX_VALUE
}

const testSkipList = new SkipList()
testSkipList.insert(12, 'qwe')
testSkipList.insert(3, 'mmm')
console.log(testSkipList.get(3))