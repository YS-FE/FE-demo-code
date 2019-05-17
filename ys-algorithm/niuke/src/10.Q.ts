
import Stack from './07.Q';

/**
 * 用栈实现队列
 */
class QueueFromStack {
  private dataStack: Stack;
  private helpStack: Stack;

  constructor(len: number){
    this.dataStack = new Stack(Array(len));
    this.helpStack = new Stack(Array(len));
  }

  enqueue(num: number): void {
    this.dataStack.push(num);
  }

  dequeue(): number {
    if (this.helpStack.length < 1){
      while (this.dataStack.length > 0){
        this.helpStack.push(this.dataStack.pop());
      }
    }
    return this.helpStack.pop();
  }

  get length(): number {
    return this.dataStack.length + this.helpStack.length;
  }
}


export default QueueFromStack;

let queue1 = new QueueFromStack(10);
queue1.enqueue(10);
queue1.enqueue(30);
queue1.enqueue(40);
queue1.enqueue(50);

console.log(queue1.dequeue());
console.log(queue1.dequeue());
queue1.enqueue(60);
console.log(queue1.dequeue());
