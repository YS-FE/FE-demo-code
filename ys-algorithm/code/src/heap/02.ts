/**
 * 1. 求n个元素无序数组中，前K大的数字
 * 具体的思路是：先建一个k个数的小根堆，然后从k+1个数往后的值与堆顶元素比较，
 * 若此数比堆顶元素大，就将堆顶元素用这个数替换，然后重新调整堆，以此向后重复上述过程，
 * 直到将N个数比较完成，那么此时组成这个堆的k个元素就是前k个大的数。
 */


/**
 * @desc 小根堆
 */
class LittleHeap {
    public count: number; // 从下标1开始存储数据
    public size: number; //此处为最大下标
    public arr: Array<number>;

    constructor (size: number) {
        this.size = size;
        this.count = 0;
        this.arr = [];
    }

    insert (data: number) {
        if (this.count === this.size) return;
        this.arr[++this.count] = data;
  
        let i = this.count;
        while ((Math.floor(i/2) > 0)
        && (this.arr[i]< this.arr[Math.floor(i/2)])) {
            this.swap(this.arr, i, Math.floor(i/2));
            i = Math.floor(i/2);
        }
    }


    heapify (index: number) {
        let minPos = index;

        while (true) {
            if ((2*index) <= this.size && (this.arr[index] > this.arr[2*index])) {
                minPos = 2 * index;
            }

            if ((2*index + 1) <= this.size && (this.arr[minPos] > this.arr[2*index + 1])) {
                minPos = 2 * index + 1;
            }

            if (minPos === index) break;
            this.swap(this.arr, index, minPos);
            index = minPos;
        }
    }

    swap (arr: Array<number>, src: number, dest: number) {
        let temp = arr[src];
        arr[src] = arr[dest];
        arr[dest] = temp;
    }
}


// 求前5大的数
let arr = [1,20,3,4,5,10,9,8,7,6];
let lh = new LittleHeap(5);

for (let index = 0; index < 5; index++) {
    lh.insert(arr[index]);
}

for (let index = 5; index < arr.length; index++) {
    if (arr[index] > lh.arr[1]) {
        lh.arr[1] = arr[index];
        //修改堆顶元素之后，都要进行堆修正
        lh.heapify(1);
    }
}

console.log(lh.arr);

export default {}