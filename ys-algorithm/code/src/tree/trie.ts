
class TrieNode {
    public data: string;
    public children: Array<TrieNode>;
    public end: number; //终结点
    public path: number; //路径

    constructor(value: string) {
        this.data = value;
        this.end = 0;
        this.path = 0;
        this.children = new Array<TrieNode>(26);
    }
}


/**
 * 暂定存储的都是 'a-z'的小写字母
 */
class Trie {
    public root: TrieNode;
    constructor() {
        this.root = new TrieNode('');
    }

    insertString (str: string) {
        if (!str) return;

        let p = this.root;
        for (let index = 0; index < str.length; index++) {
            let pos = str.charCodeAt(index) - 97;
            if (!p.children[pos]) {
                p.children[pos] = new TrieNode(str[index]);
            }
            p = p.children[pos];
            p.path++;
        }
        p.end++;
    }

    searchString (str: string): number {
        if (!str) return  0;

        let p = this.root;
        for (let index = 0; index < str.length; index++) {
            let pos = str.charCodeAt(index) - 97;
            if (!p.children[pos]) {
                return 0;
            }
            p = p.children[pos];
        }

        return p.end;
    }

    prefixString (str: string): number {
        if (!str) return  0;

        let p = this.root;
        for (let index = 0; index < str.length; index++) {
            let pos = str.charCodeAt(index) - 97;
            if (!p.children[pos]) {
                return 0;
            }
            p = p.children[pos];
        }

        return p.path;
    }

    deleteString (str: string) {
        let exist = this.searchString(str);
        if (!exist) return;

        let p = this.root;
        for (let index = 0; index < str.length; index++) {
            let pos = str.charCodeAt(index) - 97;

            if (--p.children[pos].path == 0) {
                p.children[pos] = null;
                return;
            }
            p = p.children[pos];
        }
        p.end--;
    }
}



let trie = new Trie();
trie.insertString("helloworld");
trie.insertString("hello");
trie.insertString("hello");

console.log(trie.searchString("hello")); //2
console.log(trie.prefixString("hello"));//3


export default {}