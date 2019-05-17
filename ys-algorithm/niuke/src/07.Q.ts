
/**
 * 根据一个数组的长度实现一个栈
 * 并实现返回栈中最小值的方法,要求时间复杂度为O(1)
 */
class Stack {
  private stackTop: number; //栈顶
  private size: number; //最大长度
  private store: number[];//栈元素
  private minStore: number[]; //存放最小值的栈

  constructor(arr: number[]){
    if (!arr || arr.length < 1){
      throw new Error("数组长度太小");
    }

    this.stackTop = 0;
    this.size = arr.length;
    this.store = [];
    this.minStore = [];
  }

  push(num: number): void{
    if (this.stackTop === this.size) {
      throw new Error("栈溢出");
    }
    this.store[this.stackTop] = num;

    /*****/
    //一个栈单独存放最小的数,如果要压入的数字小于当前最小值则压入新值，否则重复压入最小值,始终保持两个栈高度一致
    if (this.stackTop === 0){
      this.minStore[this.stackTop] = num;
    } else {
      this.minStore[this.stackTop] = Math.min(this.minStore[this.stackTop - 1], num);
    }
    /*****/

    this.stackTop++;
  }

  pop(): number {
    if (this.stackTop === 0) return null;
    return this.store[--this.stackTop];
  }

  peek(): number {
    if (this.stackTop === 0) return null;
    return this.store[this.stackTop - 1];
  }

  get length(): number {
    return this.stackTop;
  }

  getMin(): number {
    if (this.stackTop === 0) return null;
    return this.minStore[this.stackTop - 1];
  }
}


// let stack1 = new Stack([1,2,3,4]);

// stack1.push(10);
// stack1.push(20);
// stack1.push(30);
// stack1.push(4);

// console.log(stack1.pop());
// console.log(stack1.pop());
// console.log(stack1.pop());
// console.log(stack1.pop());
// console.log(stack1.pop());

// console.log(stack1.getMin());

export default Stack;




