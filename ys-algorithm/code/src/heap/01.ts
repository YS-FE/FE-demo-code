
class Heap {
    public n: number;
    public count: number;
    public arr: Array<number>;

    constructor (size: number) {
        this.n = size;
        this.count = 0;
        this.arr = [];
    }

    insert (data: number) {
        if (this.count == this.n) return;
        arr[++this.count] = data;

        let i = this.count;
        while (Math.floor(i/2) > 0 
        && arr[i] > arr[Math.floor(i/2)]) {
            swap(arr, i, Math.floor(i/2));
            i = Math.floor(i/2);
        }
    }
}


/**
 * @desc 构建堆
 * @param arr 
 * @param n  最后一个下标
 */
function buildHeap  (arr: Array<number>, n: number) {
    for (let i = Math.floor(n / 2); i >= 1 ; i--) {
        heapify(arr, n, i);
    }
}


/**
 * @desc 堆排序 （大根堆）
 * @param arr 
 * @param n 
 */
function  heapSort (arr: Array<number>, n: number) {
    let k = n;
    while (k > 1) {
        swap(arr, k, 1);
        k--;
        heapify(arr, k, 1);
    }
}



/**
 * @desc  修正堆
 * @param arr 
 * @param n  最后一个下标
 * @param i 
 */
function heapify (arr: Array<number>, n: number, i: number) {
    let maxPos = i;

    while (true) {
        if (2 * i <= n  &&  arr[2*i] > arr[i]) {
            maxPos = 2 * i;
        }

        if ((2 * i + 1) <= n  &&  arr[2*i + 1] > arr[maxPos]) {
            maxPos = 2 * i + 1;
        }

        if (maxPos == i) break;
        swap(arr, i, maxPos);
        i = maxPos;
    }
}


function swap (arr: Array<number>, src: number, dest: number) {
    let temp = arr[src];
    arr[src] = arr[dest];
    arr[dest] = temp;
}



let arr = [0, 10, 3, 12, 11,23, 5, 14, 20, 18];
buildHeap(arr, arr.length - 1);
heapSort(arr, arr.length  - 1);
console.log(arr);

export default {};