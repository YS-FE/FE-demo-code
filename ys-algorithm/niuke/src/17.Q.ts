
/**
 * 打印两个有序链表的公共部分
 */
import {SingleNode, printSingleList} from './14.Q';


/**
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



let list1 = new SingleNode<number>(1);
list1.next = new SingleNode<number>(2);
list1.next.next = new SingleNode<number>(3);
list1.next.next.next = new SingleNode<number>(4);
list1.next.next.next.next = new SingleNode<number>(5);
list1.next.next.next.next.next = new SingleNode<number>(6);


let list2 = new SingleNode<number>(2);
list2.next = new SingleNode<number>(3);
list2.next.next = new SingleNode<number>(5);

printCommon<number>(list1, list2);

export default printCommon;






