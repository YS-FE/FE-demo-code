
/**
 * 用一个数组的长度实现一个固定长度的队列
 * 使用当前长度的变量将头和尾进行解耦，防止混乱
 * 使用泛型 <T>
 */
class Queue<T> {
  private currSize: number; //当前长度
  private size: number; //最大长度
  private head: number; //队头
  private tail: number; //队尾
  private store: T[];

  constructor(arr: number[]){
    if (!arr || arr.length < 1) {
      throw new Error("数组长度太短");
    }
    this.size = arr.length;
    this.currSize = 0;
    this.head = 0;
    this.tail = 0;
    this.store = [];
  }

  enqueue(value: T): void {
    if (this.currSize === this.size) {
      throw new Error("队列溢出!");
    }
    this.currSize++;
    this.store[this.tail++] = value;
    this.tail = this.tail === this.size ? 0: this.tail;
  }

  dequeue(): T {
    if (this.currSize === 0) return null;
    this.currSize--;
    let temp = this.store[this.head++];
    this.head = this.head === this.size ? 0 : this.head;
    return temp;
  }

  get length(): number {
    return this.currSize;
  }

  isEmpty(): boolean {
    return !this.currSize;
  }
}


// let queue1 = new Queue<string>([1,1,1,1,1]);

// queue1.enqueue('10');
// queue1.enqueue('20');
// queue1.enqueue('30');
// queue1.enqueue('40');
// queue1.enqueue('50');

// console.log(queue1.dequeue());
// console.log(queue1.dequeue());
// queue1.enqueue('60');
// queue1.enqueue('70');

// console.log("当前长度为: ", queue1.length);

// console.log(queue1.dequeue());
// console.log(queue1.dequeue());
// console.log(queue1.dequeue());
// console.log(queue1.dequeue());
// console.log(queue1.dequeue());

export default Queue;