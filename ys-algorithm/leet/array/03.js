/**
 * 2个栈，实现一个队列
 */

var CQueue = function() {
  this.stackOne = [];
  this.stackTwo = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stackOne.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  if (this.stackOne.length == 0 && this.stackTwo.length == 0) {
    return -1;
  }

  if (this.stackTwo.length) {
    return this.stackTwo.pop();
  } else {
    let len = this.stackOne.length;
    while (len--) {
      this.stackTwo.push(this.stackOne.pop());
    }
    return this.stackTwo.pop();
  }
};
