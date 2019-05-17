/**
 * 复制一个包含随机节点指针的单链表
 */

 import {printSingleList} from './14.Q';

class SingleNode < T > {
  public value : T;
  public next : SingleNode < T >; //下一个指针
  public randNext : SingleNode < T >; //随机指针

  constructor(value : T) {
    this.value = value;
    this.next = null;
    this.randNext = null;
  }
}


/**
 * 需要额外空间复杂度 O(N)
 * @param list 
 */
function copyRandomList<T> (list: SingleNode<T>) : SingleNode<T> {
  if (!list) return null;

  let map = new Map();
  let curr = list;

  // 利用map存储 原始节点和拷贝节点
  while (curr) {
    map.set(curr, new SingleNode<T>(curr.value));
    curr = curr.next;
  }

  curr = list;
  while (curr) {
    map.get(curr).next = map.get(curr.next);
    map.get(curr).randNext = map.get(curr.randNext);
    curr = curr.next;
  }

  return map.get(list);
}


/**
 * 额外空间复杂度 O(1)
 * @param list 
 */
function copyRandomList2<T> (list: SingleNode<T>) : SingleNode<T> {
  if (!list) return null;

  let curr = list;
  let newList = null;

  // 将原始节点和拷贝节点连成一个链表, 原始节点的next为拷贝节点
  while (curr) {
    let next = curr.next;
    let node = new SingleNode<T>(curr.value);
    curr.next = node;
    node.next = next;
    curr = next;
  }

  curr = list;
  newList = list.next;

  //将整个链表进行拆分
  while (curr && curr.next && curr.next.next) {
    let next = curr.next.next;
    curr.next.next = curr.next.next.next;
    curr.next.randNext = curr.randNext.next;
    curr.next = next;
    curr = next;
  }

  return newList;
}




let head = new SingleNode < number > (1);
let list1 = new SingleNode < number > (2);
let list2 = new SingleNode < number > (3);
let list3 = new SingleNode < number > (4);

head.next = list1;
head.randNext = list2;

list1.next = list2;
list1.randNext = list3;

list2.next = list3;
list2.randNext = list1;

list3.next = null;
list3.randNext = null;


let copyHead = copyRandomList<number>(head);
printSingleList<number>(copyHead);

copyHead = copyRandomList2<number>(head);
printSingleList<number>(copyHead);

export default {};