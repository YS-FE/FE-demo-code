/**
 * 前缀树
 * "ab" "abc"  "abcd"  "bcd"
 */


 /**
  * 前缀树的节点结构(避免在节点上存储字符串的字符)
  */
 class TireNode {
   public path: number; //经过路径数
   public end: number; //结尾的个数
   public next: TireNode[]; //当前节点之后的路径节点

   constructor() {
     this.path =  0;
     this.end = 0;
     this.next = [];
   }
 }


 /**
  * 小写字母字符串的前缀树
  */
 class TireTree {
   public root: TireNode;
   constructor(){
     this.root = new TireNode();
   }

   //插入一个字符串
   insertWord(word: string) {
     if (!word) return;
     let node = this.root;
     let index: number = 0;

     for (let i = 0; i < word.length; i++) {
      index = word.charCodeAt(i) - 97;
      if (!node.next[index]) {
        node.next[index] = new TireNode();
      }
      node = node.next[index];
      node.path++;
     }
     node.end++;
   }

   // 查找一个字符串插入的个数
   searchWord(word: string): number{
     if (!word) return 0;

     let node = this.root;
     let index: number = 0;
     for (let i = 0; i < word.length; i++) {
       index = word.charCodeAt(i) - 97;
       if (!node.next[index]) {
         return 0;
       }
       node = node.next[index];
     }
     return node.end;
   }

   // 查找 以某个前缀开始的字符串
   prefixNumber(word: string): number {
     if (!word) return 0;

     let node = this.root;
     let index: number = 0;
     for (let i = 0; i < word.length; i++) {
       index = word.charCodeAt(i) - 97;
       if (!node.next[index]) {
         return 0;
       }
       node = node.next[index];
     }
     return node.path;
   }



   //删除一个字符串
   deleteWord(word: string) {
     if (!word || 0 == this.searchWord(word)) return;

     let node = this.root;
     let index: number = 0;

     for (let i = 0; i < word.length; i++) {
       index = word.charCodeAt(i) - 97;

       if (--(node.next[index].path) === 0) {
         node.next[index] = null;
         return;
       }
       node = node.next[index];
     }
     node.end--;
   }
 }


 function main() {
   let root = new TireTree();

   root.insertWord("ab");
   root.insertWord("abc");
   root.insertWord("abc");
   root.insertWord("abcd");

   console.log(root.searchWord("abc"));
   console.log(root.prefixNumber("ab"));
   root.deleteWord("abc");
   console.log(root.searchWord("abc"));
   console.log(root.prefixNumber("ab"));
 }

 main();

 export {};




