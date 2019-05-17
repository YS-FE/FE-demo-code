
/**
 * 判断一个链表是否是回文结构
 */

import {SingleNode, printSingleList} from './14.Q';


/**
 * 
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
 * 需要 O(1)额外空间复杂度
 * @param list 
 */
function isPalindrome2 <T> (list: SingleNode<T>): boolean {
  if (!list || !list.next) return false;

  let result = true;
  let n1 = null, n2 = null, n3 = null;
  n1 = list;
  n2 = list;

  while (n1 && n1.next && n2.next &&  n2.next.next) {
    n1 = n1.next;
    n2 = n2.next.next;
  }

  // 链表个数为奇数时，n1 指向中间的节点
  // 链表个数为偶数时，n1 指向中间靠左的节点
  n2 = n1.next; // n2 指向 右部分的第一个节点
  n1.next = null; 

  //右半部分进行逆序
  while (n2) {
    let next: SingleNode<T> = n2.next;
    n2.next = n3;
    n3 = n2;
    n2 = next;
  }
  //n3 为逆序之后的头节点


  //分别从两端向中间移动，进行比较
  let left = list;
  let right = n3;
  while (left && right){
    if (left.value != right.value) {
      result = false;
      break;
    }
    left = left.next;
    right = right.next;
  }


  //将右半部分的逆序调整为原样
  n2 = null;
  while (n3) {
    let next: SingleNode<T> = n3.next;
    n3.next = n2;
    n2 = n3;
    n3 = next;
  }
  n1.next = n2;

  // printSingleList<T>(list);
  return result;
}


let list = new SingleNode<number>(1);
list.next = new SingleNode<number>(2);
list.next.next = new SingleNode<number>(3);
list.next.next.next = new SingleNode<number>(3);
list.next.next.next.next = new SingleNode<number>(2)
list.next.next.next.next.next = new SingleNode<number>(1);


console.log(isPalindrome<number>(list));
console.log(isPalindrome2<number>(list));

export default {};


