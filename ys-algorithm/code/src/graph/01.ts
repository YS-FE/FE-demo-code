

class Node<T> {
    public data: T;
    public next: Node<T>;
    public prev: Node<T>;

    constructor (data ?: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}


class LinkList<T> {
    public head: Node<T>;

    constructor () {
        this.head = new Node<T>();
    }

    insert (data: T) {
        let newNode = new Node<T>(data);
        
        // front insert
        let tempNext = this.head.next;
        this.head.next = newNode;
        newNode.next = tempNext;
    }
}


class Graph {
    public v: number; // 顶点个数
    public list: Map<any, LinkList<number>>; // 存储关系的表
    public found: boolean; //dfs 时是否到达终点标记

    constructor (v: number) {
        this.v = v;

        // 每个顶点对应的链表, 假设顶点是 从1开始的连续数字
        for (let index = 1; index <=v; index++) {
            this.list.set(v, new LinkList<number>())
        }
    }

    /**
     * @desc 广度优先遍历 O(顶点+边数)
     * @param s 
     * @param t 
     */
    bfs (s: number, t: number) {
        let visited: Array<boolean> = [];
        let prev: Array<number> = [];
        let queue: Array<number> = [];

        //记录，顶点是否已经访问过
        visited.forEach((e,i,a) => {
            a[i] = false;
        });

        //访问顶点时的对应关系，反向存储的
        prev.forEach((e,i,a) => {
            a[i] = -1;
        });

        visited[s] = true;
        queue.push(s);

        while (queue.length > 0) {
            let current = queue.shift();
            let link = this.list.get(current);

            //遍历link
            let p = link.head.next;
            while (p) {
                let data = p.data;
                if (!visited[data]) {
                    prev[data] = current;
                    if (data == t) {
                        this.print(prev, s, t);
                        return;
                    }
                    visited[data] = true;
                    queue.push(data);
                }
                p = p.next;
            }

        }

    }


    /**
     * @desc 深度优先搜索 O(边数) 
     * @param s 
     * @param t 
     */
    dfs (s: number, t: number) {
        let visited: boolean[] = [];
        let prev: number[] = [];
        
        visited.forEach((e, i, a) => {
            a[i] = false;
        });

        prev.forEach((e, i, a) => {
            a[i] = -1;
        });
        this.found = false;
        this.dfs_inner(s, t, visited, prev);
        this.print(prev, s, t);
    }

    private dfs_inner (s: number, t: number, visited: boolean[], prev: number[]) {
        if (this.found) return;
        visited[s] = true;
        if (s === t) {
            this.found = true;
            return;
        }

        let link = this.list.get(s);
        let p = link.head.next;
        while (p) {
            let data = p.data;
            if (!visited[data]) {
                prev[data] = s;
                visited[data] = true;
                this.dfs_inner(data, t, visited, prev);
            }
        }
    }

    print (prev: Array<number>, s: number, t:number) {
        if ((prev[t] != -1) && (s != t)) {
            this.print(prev, s, prev[t]);
        }
        console.log(t);
    }
}









export default {};