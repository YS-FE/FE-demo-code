/**
 * 翻转 单链表，双向链表
 * 时间复杂度 O(N) 额外空间复杂度O(1)
 */

/**
 * 单链表节点
 */
export class SingleNode < T > {
  public value : T;
  public next : SingleNode < T >;

  constructor(value : T) {
    this.value = value;
    this.next = null;
  }
}


/**
 * 双向链表节点
 */
export class DoubleNode < T > {
  public value : T;
  public next : DoubleNode < T >;
  public pre : DoubleNode < T >;

  constructor(value : T) {
    this.value = value;
    this.next = null;
    this.pre = null;
  }
}

/**
  * 翻转单链表
  * @param listHead
  */
function reverseSingleList < T > (listHead : SingleNode < T >) : SingleNode < T > {
  if (!listHead) return;

  let next = null;
  let pre = null;

  while (listHead) {
    next = listHead.next;
    listHead.next = pre;
    pre = listHead;
    listHead = next;
  }

  return pre;
}


/**
 * 翻转双向链表
 * @param listHead 
 */
function reverseDoubleList<T> (listHead: DoubleNode<T>): DoubleNode<T> {
  if (!listHead) return;

  let next = null;
  let pre = null;

  while (listHead) {
    next = listHead.next;
    listHead.next = pre;
    listHead.pre = next;

    pre = listHead;
    listHead = next;
  }


  return pre;
}

/**
  * 打印单链表
  * @param listHead
  */
export function printSingleList < T > (listHead : SingleNode < T >) : void {
  if (!listHead) return;

  let head = listHead;
  let str = '';

  while (head){
    str = str + head.value + ' ';
    head = head.next;
  }

  console.log(str);
}


/**
 * 打印双向链表
 * @param listHead 
 */
export function printDoubleList<T>(listHead: DoubleNode<T>): void {
  if (!listHead) return;

  let head = listHead;
  let str = '';

  while (head) {
    str = str + head.value + ' ';
    head = head.next;
  }

  console.log(str);
}

/****************************************/


// let list1 = new SingleNode < number > (1);
// let list2 = new SingleNode < number > (2);
// let list3 = new SingleNode < number > (3);
// let list4 = new SingleNode < number > (4);

// list1.next = list2;
// list2.next = list3;
// list3.next = list4;

// console.log("单链表");
// printSingleList<number>(list1);
// let newHead = reverseSingleList<number>(list1);
// console.log("翻转之后单链表");
// printSingleList<number>(newHead);
// console.log();

/****************************************/


// let dlist1 = new DoubleNode<number>(1);
// let dlist2 = new DoubleNode<number>(2);
// let dlist3 = new DoubleNode<number>(3);
// let dlist4 = new DoubleNode<number>(4);

// dlist1.next = dlist2;
// dlist2.next = dlist3;
// dlist3.next = dlist4;

// dlist4.pre = dlist3;
// dlist3.pre = dlist2;
// dlist2.pre = dlist1;

// console.log("双向链表");
// printDoubleList<number>(dlist1);
// let newDlist = reverseDoubleList<number>(dlist1);
// console.log("翻转之后双向链表");
// printDoubleList<number>(newDlist);

export default {};


