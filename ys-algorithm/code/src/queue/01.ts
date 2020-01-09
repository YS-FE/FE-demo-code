/*
 * @Author: yangshang01
 * @Date: 2019-08-09 16:38:16
 * @LastEditors: yangshang01
 * @LastEditTime: 2019-08-09 17:06:20
 * @Description: 
 */


/**
 * @desc 循环队列
 */
class Queue {
    public size: number;
    public currentSize: number;
    private head: number;
    private tail: number;
    private queueArray: Array<any>;

    constructor(size: number) {
        this.size = size;
        this.head = 0;
        this.tail = 0;
        this.currentSize = 0;
        this.queueArray = [];
    }

    enqueue(data: any): void {
        if (this.currentSize === this.size) {
            console.log('queue is full');
            return;
        }
        
        this.currentSize++;
        this.queueArray[this.tail] = data;
        this.tail = (this.tail + 1) % this.size;
    }

    dequeue(): any {
        if (this.head === this.tail) {
            console.log('queue is empty');
            return;
        }

        this.currentSize--;
        let data = this.queueArray[this.head];
        this.head = (this.head + 1) % this.size;
        return  data;
    }
    
}


let queue = new Queue(10);
for (let index = 0; index < 100; index++) {
    queue.enqueue(index);
}


export default {};