/**
 * 用队列结构实现栈
 */

import Queue from './08.Q';

class StackFromQueue{
  private dataQueue: Queue;
  private helpQueue: Queue;

  constructor(len: number){
    this.dataQueue = new Queue(Array(len));
    this.helpQueue = new Queue(Array(len));
  }

  push(num: number): void {
    this.dataQueue.enqueue(num);
  }

  pop(): number {
    while (this.dataQueue.length > 1){
      this.helpQueue.enqueue(this.dataQueue.dequeue());
    }

    let temp = this.dataQueue.dequeue();
    this._swap();
    return temp;
  }

  peek(): number {
    while (this.dataQueue.length > 1){
      this.helpQueue.enqueue(this.dataQueue.dequeue());
    }
    let temp = this.dataQueue.dequeue();
    this.helpQueue.enqueue(temp);
    
    this._swap();
    return temp;
  }

  get length(): number {
    return this.dataQueue.length;
  }

  private _swap(){
    let temp = this.dataQueue;
    this.dataQueue = this.helpQueue;
    this.helpQueue = temp;
  }
}

let stack = new StackFromQueue(10);

stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);

console.log(stack.length);
console.log(stack.pop());
console.log(stack.length);

export default StackFromQueue;

