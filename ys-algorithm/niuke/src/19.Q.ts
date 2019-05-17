/**
 * 将一个链表 转换成  小于、等于、大于某个数的 的三部分串联
 */

 import {SingleNode, printSingleList} from './14.Q';


/**
 * 分割链表 时间复杂度 O(N) 额外空间复杂度 O(1), 组成的三部分是无序的
 * @param list 
 * @param T
 */
function splitList<T> (list: SingleNode<T>, num: T): SingleNode<T> {
  if (!list || !list.next) return list;

  let head = list;
  let lessHead = null, lessEnd = null, eqHead = null, eqEnd = null, moreHead = null, moreEnd = null;
  let newList = null;

  //遍历链表，找到 三个符合条件的，当做各自的头节点
  while (head) {
    if (lessHead == null && head.value < num) {
      lessHead = head;
      lessEnd = head;
    }

    if (eqHead == null && head.value == num) {
      eqHead = head;
      eqEnd = head;
    }

    if (moreHead === null && head.value > num) {
      moreHead = head;
      moreEnd = head;
    }

    head = head.next;
  }


  //遍历链表，将对应的数据追加到不同的链表中
  head = list;
  while (head) {
    let next: SingleNode<T> = head.next;
    head.next = null;

    if (lessEnd && head.value < num) {
      lessEnd.next = head;
      lessEnd = lessEnd.next;
    } else if (eqEnd && head.value == num) {
      eqEnd.next = head;
      eqEnd = eqEnd.next;
    } else if (moreHead) {
      moreEnd.next = head;
      moreEnd = moreEnd.next;
    }

    head = next;
  }

  // 将 less, eq, more 三个链表串联起来,要处理其中为null的情况
  if (lessEnd) {
    if (eqHead) {
      lessEnd.next = eqHead;
      if (moreHead) {
        eqEnd.next = moreHead;
      }
    } else if (moreHead) {
      lessEnd.next = moreHead;
    }
    newList = lessHead;
  } else if (eqEnd) {
    if (moreHead) {
      eqEnd.next = moreHead;
    }
    newList = eqHead;
  } else {
    newList = moreHead;
  }

  return newList;
}




let list = new SingleNode<number>(3);
list.next = new SingleNode<number>(1);
list.next.next = new SingleNode<number>(2);
list.next.next.next = new SingleNode<number>(4);
list.next.next.next.next = new SingleNode<number>(6)
list.next.next.next.next.next = new SingleNode<number>(5);

printSingleList(splitList<number>(list, 4));

export default {};