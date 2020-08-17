/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head) return null;

  let copy = [];
  let index = 0;
  let currentNode = head;

  while (currentNode) {
    copy.push(currentNode.val);
    currentNode = currentNode.next;
  }

  copy.sort((a, b) => a - b);

  currentNode = head;
  while (currentNode) {
    let tempNode = currentNode.next;
    currentNode.val = copy[index++];
    currentNode = tempNode;
  }

  return head;
};