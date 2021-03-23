const { Forbidden } = require("http-errors");
const { clearTimeout } = require("node:timers");


// 两数组 合并 并有序
function sum (arr1, arr2) {
  return arr1.concat(arr2).sort((a, b) => a - b);
}


/**
 * 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
  你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 */
function twoNum (nums, target) {
  let resultMap = new Map();

  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    const resultIndex = target - element;

    if (resultMap.get(resultIndex)) {
      return [i, resultMap.get(resultIndex)];
    }

    resultMap.set(nums[i], i);
  }
  return [];
}


/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
 */
//这道题经典的是细节，需要考虑蛮多细节的
//解法：
//1.暴力破解，三层枚举，O（n^3）效率太低不考虑
//2.a+b+c = 0，转换思路，a+b = -c，这不就是两数之和嘛？
//3.利用双指针夹逼，但是怎么避免重复呢？
//3.1 排序即可，利用排序好的数组，固定一个指针i，夹逼选举left和right
//3.2 这道题难度在于要考虑的细节太多，多想想即可。
//3.3 扩展一下，如果是4数之和，五数之和，N数之和呢？怎么解决？
const threeSum = (nums) => {
  const len = nums.length
  const result = []
  // 因为是三数之和，小于三个不用考虑了
  if(len < 3){
    return result
  }
  nums.sort((a, b) => a - b)
  // len - 2 同样道理，小于三个不用考虑
  for(let i = 0; i < len - 2; i++){
    // 如果第一个就大于0了，三个加起来肯定大于0
    if(nums[i] > 0){
      break
    }
    // 避免掉重复的情况
    if(i && nums[i] === nums[i - 1]){
       continue
    }
    let left = i + 1
    let right = len - 1
    // 双指针夹逼
    while(left < right){
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === 0){
         result.push([nums[i], nums[left++], nums[right--]])
         // push 加了之后防止还存在重复
         while(nums[left] === nums[left - 1]){
           left++
         }
         while(nums[right] === nums[right + 1]){
           right--
         } 
      }else if(sum > 0){
          right--
      }else{
          left++
      }
    }
  }
  return result
}



function unique (arr)  {
  return Array.from(new Set(arr));
}


function flat (arr, dep) {
  return arr.flat(dep);
}


function composeFn(...fns) {
  return (initValue) => fns.reduceRight((y, fn) => fn(y), initValue);
}

// composeFn(unique, flat)(arr);


function myFlat (arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }

  return [...new Set(arr)];
}


// 数组交集
function  intersection (n1, n2) {
  return [...new Set(n1.filter(y => n2.includes(y)))];
}


// 多数组交集
function  intersections (firstArr, ...arrs) {
  return [...new Set(firstArr.filter(item => arrs.every(target => target.includes(item))))];
}

var LRUCache = function(capacity) {
  this.cache = new Map()
  this.capacity = capacity
}

LRUCache.prototype.get = function(key) {
  if (this.cache.has(key)) {
      // 存在即更新
      let temp = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
  }
  return -1
}

LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
      // 存在即更新（删除后加入）
      this.cache.delete(key)
  } else if (this.cache.size >= this.capacity) {
      // 不存在即加入
      // 缓存超过最大值，则移除最近没有使用的
      this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
}



class MyLRU {
  constructor (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      let temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }
    return -1;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
  }
}


// 链表翻转
function revertLink (head) {
  let pre = head;
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



function revertDLink (link) {
  let prev = link;
  let cur = link.next;
  let temp = cur.next;


  while (cur) {
    temp = cur.next;
    cur.next = prev;
    cur.prev = temp;
    pre = cur;
    cur = temp;
  }

  head.next = null;
  return prev;
}

// 有序单链表合并
function mergeOrderList (list1, list2) {
  if (list1 == null) return list2;
  if (list2 == null) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeOrderList(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeOrderList(list2.next, list1);
    return list2;
  }
   
  return null;
}


// 不产生新数组，删除数组里的重复元素
function unique2 (arr) {
  let lastIndex = arr.length - 1;
  for (let index = lastIndex; index >= 0; index++) {
    const element = arr[index];
    if (arr.indexOf(element) !== index) {
      arr[index] = arr[lastIndex--];
    }
  }

  arr.splice(lastIndex + 1);
  return arr;
}


Function.prototype.myApply = function (thisArg) {
    thisArg = thisArg ? Object(thisArg) : window;
    thisArg.fn = this;

    let args = [...arguments.slice(1)];
    let result = thisArg.fn(args);

    delete thisArg.fn;
    return result;
}

Promise.prototype.finally2 =  function (cb) {
  cb = cb ? cb : function () {};

  let Fn = this.constructor;


  let resolveHandle = function (data) {
    return Fn.resolve(cb()).then(function () {
      return data;
    });
  }

  let rejectHandle = function (err) {
    return Fn.resolve(cb()).then(function () {
      throw err;
    })
  }

  this.then(resolveHandle, rejectHandle);
}


Promise.race2 = function (...promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(cur => {
      cur.then(resolve, reject);
    })
  });
}

function _new () {
  let obj = new Object();
  let C = arguments[0];
  obj.__proto__ = C.prototype;

  let result =  C.apply(obj, arguments.slice(1));
  return result instanceof C ? result : obj;
}



function debunce (fn, interval) {
  let timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(null, arguments)
    }, interval);
  }
};


function throttle (fn, interval) {
  let timer = null;
  let lastTime = Date.now();

  return function () {
    clearTimeout(timer);
    let now = Date.now();

    if (now - lastTime > interval) {
      lastTime = now;
      return fn.apply(null, arguments);
    } else {
      timer = setTimeout(() => {
        return fn.apply(null, arguments);
      }, interval - (now - lastTime));
    }
  }
}


const setTimeout2 = (fn, interval, ...args) => {
  let start = Date.now();
  let timer = null;

  const loop = () => {
    timer = window.requestAnimationFrame(loop);

    let now = Date.now();
    if ( now - start > interval) {
      window.cancelAnimationFrame(timer)
      fn.apply(null, args);
    } 
  }

  window.requestAnimationFrame(loop);
}

const thunkify = fn => (...rest) => callback => fn(...rest, callback);


/**
 * 最长不重复子串
 * @description: 时间复杂度 O(N)
 * @param {type} 
 * @return: 
 */
function getMaxSubstr2 (str: string): string {
  if (!str) return null;

  if (str.length == 1) {
      return str;
  }

  let book: Array<number> =  (new Array(256)).fill(-1);
  let pre = -1, end = 0, maxLen = 0;

  for (let index = 0; index < str.length; index++) {
      pre = Math.max(pre, book[str.charCodeAt(index)]);
      if ((index - pre) > maxLen) {
          maxLen = index - pre;
          end = index;
      }
      book[str.charCodeAt(index)] = index;
  }

  return str.slice(pre + 1, end + 1);
}



/**
 * 链表删除倒数第k个节点
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
 * "A-1B12C--3" = (-1) + 12 + 3 = 8, 两个'-'为正， 一个'-'为负
 * 关键： num = num * 10 + (pos ? cur : -cur); pos代表正负
 * @description: 字符串中数字子串的求和 O(N)
 * @param {type} 
 * @return: 
 */
 function sum (str: string): number {
  if (!str) {
      return 0;
  }

  let result = 0, pos = true, num = 0;

  for (let index = 0; index < str.length; index++) {
      let code = str.charCodeAt(index);
      let value = parseInt(str[index]);

      if ((code >= 48) && (code <= 57)) {
          //数字字符,求每个数字值
          num = num * 10 + (pos? value: (-value));
      } else {
          //非数字字符,负责进行累加
          result += num;
          num = 0;

          if (str[index] === '-') {
              if ((index >= 1)  && str[index - 1] === '-') {
                  pos = !pos;
              }
          } else {
              pos = true;
          }
      }
  }

  //循环结束之后，仍需要累加一次，防止出现以数字结尾时在循环中没有累加的问题
  result += num;

  return result;
}


/**
 * "aaabbbccddef"
 * @description: 压缩字符串 "a3b3c2d2ef",如果压缩的字符串比原字符串长，
 * 那么返回原字符串
 * @param {type} 
 * @return: 
 */
 function statistics (str: string): string {
  if (!str) {
      return '';
  }

  let result: string = '';
  let count: number = 1;//计数从1开始

  for (let index = 0; index < str.length; index++) {
      if (str[index] === str[index + 1]) {
          count++;
      } else {
          result += str[index] + count;
          count = 1;
      }
  }

  result = result.length > str.length ? str : result;

  return result;
}




/**
 * 字符串翻转
 * @description: 
 * @param {type} 
 * @return: 
 */
 function reverseString (str: string): string {
  if (!str) {
      return '';
  }

  // return str.split('').reverse().join('');

  let temp, strArray = str.split('');
  for (let index = 0; index < strArray.length / 2; index++) {
      temp = strArray[index];
      strArray[index] = strArray[strArray.length - 1 - index];
      strArray[strArray.length - 1 - index] = temp;
  }

  return strArray.join('');
}



/**
 * 判断一个字符串中的字符是否只出现一次
 * 时间复杂度 O(N), 额外空间复杂度 O(1)
 */


//额外空间复杂度高
function isUnique (str: string): boolean {
  if (!str) {
      return false;
  }

  let arr: boolean[] = (new Array(256)).fill(false);
  for (let index = 0; index < str.length; index++) {
      if (arr[str.charCodeAt(index)]) {
          return false;
      }
      arr[str.charCodeAt(index)] = true;
  }
  return true;
}



/**
 * @description: 二叉树是否为搜索二叉树
 * @param {type} 
 * @return: 
 */
 function isBST(root: Node): boolean {
  if (!root) {
      return true;
  }

  return isBSTUtil(root, Number.MIN_VALUE, Number.MAX_VALUE);
}

function isBSTUtil(root: Node, min: number, max: number): boolean {
  if (!root) {
      return true;
  }

  if (root.value < min || root.value > max) {
      return false;
  }

  return isBSTUtil(root.left, min, root.value - 1) && 
  isBSTUtil(root.right,  root.value + 1, max);
}



/**
 * 判断有效括号
 * @param {String} str 
 */

 function getValidBrackets (str) {
  if (!str) return false;

  let leftBrackets = "({[";
  let rightBrackets = ")}]";
  let stack = [];

  let arr = str.split('');
  for (let index = 0; index < arr.length; index++) {
     // 左括号
    if (leftBrackets.includes(arr[index])) {
      stack.push(arr[index])
    } else {
      // 右括号
      console.log(rightBrackets.split(''));

      let rithtIndex = (rightBrackets.split('')).findIndex(e => e === arr[index]);
      if (stack.length === 0 || (stack[stack.length - 1] != leftBrackets[rithtIndex])) return false;
      stack.pop();
    }   
  }

  return stack.length > 0 ? false : true;
}


/**
 * 二叉树深度
 * @param {TreeNode} root
 * @return {number}
 * 递归方式
 */
 var maxDepth = function(root) {
  if (!root) return 0;

  let lmax = 0, rmax = 0;
  lmax = maxDepth(root.left);
  rmax = maxDepth(root.right);
  return Math.max(lmax, rmax) + 1;
};


/**
 * 冒泡排序 O(N^2)
 * @param arr
 */
 function bubbleSort(arr: number[]): void {
  if (!arr || arr.length < 2)
    return;

  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1])
        swap(arr, j, j + 1);
    }
  }
}

/** ================================================= **/

/**
 * 选择排序 O(N^2)
 * @param arr
 */
function selectSort(arr: number[]): void {
  if (!arr || arr.length < 2)
    return;
  let minIndex: number;

  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
}


/**
 * @desc 循环队列
 */
class Queue {
    public size: number;
    public currentSize: number;
    private head: number;
    private tail: number;
    private queueArray: Array<any>;

    constructor(size: number) {
        this.size = size;
        this.head = 0;
        this.tail = 0;
        this.currentSize = 0;
        this.queueArray = [];
    }

    enqueue(data: any): void {
        if (this.currentSize === this.size) {
            console.log('queue is full');
            return;
        }
        
        this.currentSize++;
        this.queueArray[this.tail] = data;
        this.tail = (this.tail + 1) % this.size;
    }

    dequeue(): any {
        if (this.head === this.tail) {
            console.log('queue is empty');
            return;
        }

        this.currentSize--;
        let data = this.queueArray[this.head];
        this.head = (this.head + 1) % this.size;
        return  data;
    }
    
}



/**
 * 判断是否是平衡二叉树
 * 递归返回每个节点的平衡情况和树的层次
 * @param node 
 */
 export function isBalanceTree (node: BinaryTree<number>): Data {
  if (!node) return {balanceStatus: true, level: 0};

  let left = isBalanceTree(node.left);
  if (!(left.balanceStatus)) {
    return {balanceStatus: false, level: 0};
  }

  let right = isBalanceTree(node.right);
  if (!(right.balanceStatus)) {
    return {balanceStatus: false, level: 0};
  }

  if (Math.abs(left.level - right.level) > 1) {
    return {balanceStatus: false, level: 0};
  }

  return {
    balanceStatus: true,
    level: Math.max(left.level, right.level) + 1
  }
}



/**
 * 链表是否为回文
 * 需要O(N)的 额外的空间复杂度
 * @param list 
 */
 function isPalindrome<T> (list: SingleNode<T>): boolean {

  if (!list || !list.next) return false;

  let tempArr: T[] = [];
  let head = list;

  while (head) {
    tempArr.push(head.value);
    head = head.next;
  }

  head = list;

  while (head) {
    if (head.value != tempArr.pop()) {
      return false;
    }
    head = head.next;
  }

  return true;
}



/**
 * 链表
 * 打印公共部分(链表为从小到大的排序)
 * @param list1 
 * @param list2 
 */
 function printCommon<T> (list1: SingleNode<T>, list2: SingleNode<T>): void {
  if (!list1 || !list2) return ;

  let head1 = list1;
  let head2 = list2;

  let str = '';

  while (head1 && head2) {
    if (head1.value < head2.value) {
      head1 = head1.next;
    } else if (head1.value > head2.value){
      head2 = head2.next;
    } else {
      str = str + head1.value + ' ';
      head1 = head1.next;
      head2 = head2.next;
    }
  }
  console.log(str);
}




/**
 * 桶排序 时间复杂度O(N)
 * @param arr
 */
function bucketSort(arr : number[]){
  if (!arr || arr.length < 2) return;

  let bucket: number[] = [];
  let start: number = 0;

  bucket = Array(Math.max.apply(null, arr) + 1).fill(0);

  arr.forEach((e, i) => {
    bucket[e] += 1;
  });

  bucket.forEach((e, i) => {
    for (let index = 0; index < e; index++) {
      arr[start++] = i;
    }
  });

}


/**
 * 给定一个数组， 一个数字，将数组中小于等于该数字的放到数组左边，大于的放到右边
 * 时间复杂度 O(N)
 */
 function partion(arr: number[], l: number, r: number, num: number): void {
  if (!arr || arr.length < 2) return;
  let lessIndex: number = l - 1;

  // 只换分一个小于区域
  while (l <=  r) {
    if (arr[l] <= num) {
      swap(arr, ++lessIndex, l);
    }
    l++;
  }
}


/////////////
/**
 * 归并排序 O(N * logN) 分而治之, 额外空间复杂度O(N)
 * @param arr
 */
 function mergeSort(arr: number[]): void {
  if (!arr || arr.length < 2)
    return;
  mergeProcess(arr, 0, arr.length - 1);
}

function mergeProcess(arr: number[], l: number, r: number): void {
  if (l === r)
    return;

  let mid: number = l + (r - l) >> 1;
  mergeProcess(arr, l, mid);
  mergeProcess(arr, mid + 1, r);
  merge(arr, l, mid, r);
}

/**
 * 左右排序合并
 * @param arr
 * @param l
 * @param mid
 * @param r
 */
function merge(arr: number[], l: number, mid: number, r: number): void {
  let i: number = 0;
  let p1: number = l;
  let p2: number = mid + 1;
  let tempArr: number[] = [];

  while (p1 <= mid && p2 <= r) {
    tempArr[i++] = arr[p1] > arr[p2]
      ? arr[p2++]
      : arr[p1++];
  }

  while (p1 <= mid) {
    tempArr[i++] = arr[p1++];
  }

  while (p2 <= r) {
    tempArr[i++] = arr[p2++];
  }

  for (let index = 0; index < tempArr.length; index++) {
    arr[l + index] = tempArr[index];
  }
}


/////////////////////

let  printSubsequenceResult = [];
/**
 * 所有子串
 * 递归输出
 * @param str 
 * @param index 
 * @param result 
 */
 function printSubsequence(str: string, index: number, result: string): void {
  if (str.length == index) {
      printSubsequenceResult.push(result);
  } else {
      printSubsequence(str, index + 1, result);
      printSubsequence(str, index + 1, result + str[index]);
  }
}

printSubsequence("helloabc123", 0, '');

/////////////////////

// 最长公共子串
function LCS(str1, str2){
  var m = str1.length 
  var n = str2.length
  var dp = [new Array(n+1).fill(0)] //第一行全是0
  for(var i = 1; i <= m; i++){ //一共有m+1行
      dp[i] = [0] //第一列全是0
      for(var j = 1; j <= n; j++){//一共有n+1列
          if(str1[i-1] === str2[j-1]){ 
              //注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
              dp[i][j] = dp[i-1][j-1] + 1 //对角＋1
          } else {
               dp[i][j] = Math.max( dp[i-1][j], dp[i][j-1]) 
          }
      }
  } 
  return dp[m][n];
}


/*
删除相邻重复字符
使用栈，进栈之前跟栈顶比较，如果不同则进栈，如果相同则栈顶元素出栈
**/
var removeDuplicates = function(S) {
  let stack = [S[0]]
  for (let i = 1; i < S.length; i++) {
    if (S[i] === stack[stack.length - 1]) {
      stack.pop()
    } else {
      stack.push(S[i])
    }
  }
  return stack.join('')
};
////////////////////

/**
 * 删除字符串中出现次数 >= 2 次的相邻字符
 * @param {string}s
 */
 function removeDuplicate(s) {
  const stack = [] // Space: O(n)
  let top
  let next
  let i = 0
  while (i < s.length) { // Time: O(n)
    top = stack[stack.length - 1]
    next = s[i]
    if (next === top) {
      // 字符串中出现了相邻字符
      // 1. 移除栈顶字符
      // 2. 移动指针, 指向下一个不同的字符
      stack.pop()
      while (s[i] === top) i += 1
    } else {
      stack.push(next)
      i += 1
    }
  }

  return stack.join('')  // Time: O(n)
}

//////////////////
// 第一个只出现一次的字符
var firstUniqChar = function(s) {
  let map = new Map()
  let queue = []
  for (let i = 0; i < s.length; i++) {
      let c = s[i]
      if(map.has(c)) {
          queue[map.get(c)][1] += 1
      } else {
          map.set(c, queue.length)
          queue.push([c, 1])
      }
  }

  let res = queue.filter(item => item[1] === 1)
  return res.length ? res.shift()[0] : ' '
};

//////////////////
// 爬楼梯
let climbStairs = function(n) {
  let dp = [1, 1]
  for(let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
/////////////////


/////// 翻转字符串单词
var reverseWords = function(s) {
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
};


//////// 有效三角形的个数
//// 排序，前2个相加 大于后边
let triangleNumber = function(nums) {
  if(!nums || nums.length < 3) return 0
  let count = 0
  // 排序
  nums.sort((a, b) => a - b) 
  for(let k = nums.length - 1; k > 1; k--){
      let i = 0, j = k - 1
      while(i < j){ 
          if(nums[i] + nums[j] > nums[k]){
              count += j - i
              j--
          } else {
              i++
          }
      }
  }       
  return count
}

///// 前序、中序 ，构造二叉树
var buildTree = function(preorder, inorder) {
  if(!preorder.length) return null
  const node = new TreeNode(preorder[0])
  const index = inorder.indexOf(preorder[0])
  const inLeft = inorder.slice(0, index)
  const inRight = inorder.slice(index + 1)
  const preLeft = preorder.slice(1, index + 1)
  const preRight = preorder.slice(index + 1)
  node.left = buildTree(preLeft, inLeft)
  node.right = buildTree(preRight, inRight)
  return node
};
/////////



//最长公共前缀
var longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) return "";
  if(strs.length === 1) return strs[0]
  let min = 0, max = 0
  for(let i = 1; i < strs.length; i++) {
      if(strs[min] > strs[i]) min = i
      if(strs[max] < strs[i]) max = i
  }
  for(let j = 0; j < strs[min].length; j++) {
      if(strs[min].charAt(j) !== strs[max].charAt(j)) {
          return strs[min].substring(0, j)
      }
  }
  return strs[min]
};


///// 最小路径和
var minPathSum = function(grid) {
  let row = grid.length, col = grid[0].length

  // calc boundary
  for(let i = 1; i < row; i++)
      // calc first col
      grid[i][0] += grid[i - 1][0]

  for(let j = 1; j < col; j++)
      // calc first row
      grid[0][j] += grid[0][j - 1]

  for(let i = 1; i < row; i++)
      for(let j = 1; j < col; j++)
          grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
  
  return grid[row - 1][col - 1]
};
////////



///// 生成合法的括号对
const generateParenthesis = (n) => {
  const res = []
  const dfs = (path, left, right) => {
      // 肯定不合法，提前结束
      if (left > n || left < right) return
      // 到达结束条件
      if (left + right === 2 * n) {
          res.push(path)
          return
      }
      // 选择
      dfs(path + '(', left + 1, right)
      dfs(path + ')', left, right + 1)
  }
  dfs('', 0, 0)
  return res
}

///// 数组 全排列组合
let permute = function(nums) {
  // 使用一个数组保存所有可能的全排列
  let res = []
  if (nums.length === 0) {
      return res
  }
  let used = {}, path = []
  dfs(nums, nums.length, 0, path, used, res)
  return res
}
let dfs = function(nums, len, depth, path, used, res) {
  // 所有数都填完了
  if (depth === len) {
      res.push([...path])
      return
  }
  for (let i = 0; i < len; i++) {
      if (!used[i]) {
          // 动态维护数组
          path.push(nums[i])
          used[i] = true
          // 继续递归填下一个数
          dfs(nums, len, depth + 1, path, used, res)
          // 撤销操作
          used[i] = false
          path.pop()
      }
    
  }
}

///// 连续字符 出现的最大次数
const maxRepeatLetter = str => {
  const arr = str.match(/(\w)\1*/g)
  const maxLen = Math.max(...arr.map(s => s.length))
  const result = arr.reduce((pre, curr) => {
    if (curr.length === maxLen) {
      pre[curr[0]] = curr.length
    }
    return pre
  }, {})
  return result
}
//////