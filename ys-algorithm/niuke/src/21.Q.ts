
import {SingleNode, printSingleList} from './14.Q';

/**
 * 给出2个单链表的头结点，找到他们第一个相交的节点
 * 时间复杂度 O(M+N), 额外空间复杂度 O(1)
 * 具体 分支情况看 单链表相交.png
 * @param list1 
 * @param list2 
 */
function findFirstCommon<T> (list1: SingleNode<T>, list2: SingleNode<T>): SingleNode<T> {
  if (!list1 || !list2) return null;

  let head1 = list1, head2 = list2;
  let list1Circle = null, list2Circle = null;

  //先判断 2个单链表是否有环 
  list1Circle = isCircle2(list1);
  list2Circle = isCircle2(list2);

  //分情况进行处理
  //1. 2链表个都无环 
  if (!list1Circle && !list2Circle) {
    let list1Attr = getListLength<T>(list1);
    let list2Attr = getListLength<T>(list2);

    //如果最后一个节点不是同一个，则肯定不相交
    if (list1Attr.lastNode !== list2Attr.lastNode) return null;


    //长度较长的链表向后移动几步，保证他们从相等位置出发
    if (list1Attr.len > list2Attr.len) {
      for (let i = 0; i < list1Attr.len - list2Attr.len ; i++) {
        head1 = head1.next;
      }
    } else if (list1Attr.len < list2Attr.len) {
      for (let i = 0; i < list2Attr.len - list2Attr.len ; i++) {
        head2 = head2.next;
      }
    }

    //碰到的第一个相等的节点 就是第一个相交的的节点
    while (head1 && head2) {
      if (head1 === head2) {
        return head1;
      }
      head1 = head1.next;
      head2 = head2.next;
    }
  }

  //2. 2个链表都有环
  if (list1Circle && list2Circle) {
     
    //如果入环的节点相等
    if (list1Circle  === list2Circle) {
      head1 = list1;
      head2 = list2;
      let n: number = 0;

      while (head1 !== list1Circle) {
        n++;
        head1 = head1.next;
      }

      while (head2 !== list2Circle) {
        n--;
        head2 = head2.next;
      }


      head1 = list1;
      head2 = list2;

      if (n > 0) {
        n = Math.abs(n);
        while (n--) {
          head1 = head1.next;
        }
      } else {
        n = Math.abs(n);
        while (n--) {
          head2 = head2.next;
        }
      }

      while (head1 !== head2) {
        head1 = head1.next;
        head2 = head2.next;
      }
      return head1;

    } else {
      //入环节点不一样
      head1 = list1Circle.next;
      while (head1 !== list1Circle) {
        if (head1 === list2Circle) {
          return list1Circle
        }
        head1 = head1.next;
      }
    }

    //其他情况 统统返回null
  }

  //3. 一个有环，一个无环的链表不可能有相交的节点 
  return null;
}

interface listAttr<T> {
  len: number;
  lastNode: SingleNode<T>
};

/**
 * 返回一个无环单链表的 长度 以及 最后一个节点
 * @param list 
 */
function getListLength<T>(list: SingleNode<T>): listAttr<T> {
  let attr: listAttr<T> = {
    len: 0,
    lastNode: null
  };

  if (!list) return attr;

  let head = list;
  while (1) {
    attr.len++;
    attr.lastNode = head;
    head = head.next;
    if (!head) return attr;
  }
}



/**
 * 单链表是否有环, 返回第一个入环的节点
 * @param list 
 */
function isCircle<T> (list: SingleNode<T>): SingleNode<T> {
  if (!list || !list.next) return null;

  let head = list;

  //使用set结构
  let set = new Set();
  while (head) {
    if (set.has(head))  return head;

    set.add(head);
    head = head.next;
  }

  return null;
}

/**
 * 单链表是否有环,返回第一个入环的节点
 * @param list 
 */
function isCircle2<T> (list: SingleNode<T>): SingleNode<T>{
  if (!list || !list.next) return null;

  let slow = list.next;
  let fast = list.next.next;

  // 如果有环，那么快指针和慢指针一定会相遇
  while (slow && fast && fast.next) {
    if (slow === fast) {
      fast = list;

      //相遇时，将快指针指向链表头结点,快慢指针都按照一步运动，相遇的第一个节点即入环的节点
      while (slow && fast) {
        if (slow === fast) return slow;
        slow = slow.next;
        fast = fast.next;
      }
      break;
    }

    slow = slow.next;
    fast = fast.next.next
  }

  return null;
}






export default {};



let head = new SingleNode < number > (1);
let list1 = new SingleNode < number > (2);
let list2 = new SingleNode < number > (3);
let list3 = new SingleNode < number > (4);
let list4 = new SingleNode < number > (5);
let list5 = new SingleNode < number > (6);

head.next = list1;
list1.next = list2;
list2.next = list3;
list3.next = list4;
list4.next = list5;
list5.next = list2;


let head2 = new SingleNode<number>(10);
head2.next = new SingleNode<number>(11);
head2.next.next = list2;

console.log(findFirstCommon(head, head2));
