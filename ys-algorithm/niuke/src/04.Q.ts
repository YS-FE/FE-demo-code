/**
 * 求一个不定长度的数组的中位数(假设数组的个数不定时增加)。
 * 每次对数组进行重新排序取中位数复杂度太高
 * 创建2个堆,大根堆(存放较小的数), 小根堆(存放较大的数)
 */

let bigHeap : number[] = []; //大根堆
let bigHeapSize: number = 0; //大根堆的有效长度

let littleHeap : number[] = []; //小跟堆
let littleHeapSize : number = 0; //小跟堆的有效长度

/**
  * 插入大根堆一个数(放的是较小的数)
  * @param bigHeap
  * @param value
  */
function InsertToBigHeap(bigHeap : number[], value : number) : void {
  let index: number = bigHeapSize;
  let parentIndex: number = parseInt(((index - 1) / 2) + '');

  bigHeap[index] = value;
  bigHeapSize++;

  while (bigHeap[index] > bigHeap[parentIndex]) {
    swap(bigHeap, index, parentIndex);
    index = parentIndex;
    parentIndex = parseInt((index - 1) / 2 + '');
  }


  /**
   * 保持2个堆的平衡，只要个数差大于1,则将多的一个弹出给另一个
   */
  if ((bigHeapSize - littleHeapSize) > 1) {
    let popValue = bigHeap[0];
    swap(bigHeap, 0, --bigHeapSize); //弹出第一个的值 ==> 交换到最后一个,且长度减一，最后一个值无效了
    fixToBigHeap(bigHeap, 0, bigHeapSize);
    InsertToLittleHeap(littleHeap, popValue);
  }

}

/**
  * 某个位置的数字变化，重新调整为大根堆
  * @param bigHeap
  * @param index
  */
function fixToBigHeap(bigHeap : number[], index : number, size: number) {
  let left:number = 2 * index + 1;

  while (left < size) {
    let largest: number;

    if (left + 1 < size) {
      largest = (bigHeap[left] > bigHeap[left + 1])  ? left : left + 1;
    } else {
      largest = left;
    }

    largest = bigHeap[index] > bigHeap[largest] ? index : largest;
    if (index === largest) break;

    swap(bigHeap, index, largest);
    index = largest;
    left = 2 * index + 1;
  }
}

/**
  * 插入小根堆一个数(放的是较大的数)
  * @param littleHeap
  * @param value
  */
function InsertToLittleHeap(littleHeap : number[], value : number) : void {
  let index: number = littleHeapSize;
  let parentIndex: number = parseInt(((index - 1) / 2) + '');
  littleHeap[index] = value;
  littleHeapSize++;

  while (littleHeap[index] < littleHeap[parentIndex]) {
    swap(littleHeap, index, parentIndex);
    index = parentIndex;
    parentIndex = parseInt(((index - 1) / 2) + '');
  }

  if ((littleHeapSize - bigHeapSize) > 1) {
    let popValue = littleHeap[0];
    swap(littleHeap, 0, --littleHeapSize);
    fixToLittleHeap(littleHeap, 0, littleHeapSize);
    InsertToBigHeap(bigHeap, popValue);
  }
}

/**
  * 某个位置的数字变化，重新调整为小根堆
  * @param bigHeap
  * @param index
  */
function fixToLittleHeap(littleHeap : number[], index : number, size: number) {
  let left:number = 2 * index + 1;

  while (left < size) {
    let min: number;

    if (left + 1 < size) {
      min = (littleHeap[left] < littleHeap[left + 1]) ? left: left + 1;
    } else {
      min = left;
    }


    min = littleHeap[index] > littleHeap[min] ? min : index;
    if (index === min) break;

    swap(littleHeap, index, min);
    index = min;
    left = 2 * index + 1;
  }
}

function swap(arr : number[], start : number, end : number) {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}




//随机生成 10个数测试中位数
for (let index = 0; index <  10; index++) {
  let value: number = Math.floor(Math.random() * 100);

  if (value > bigHeap[0]) {
    InsertToLittleHeap(littleHeap, value);
  } else  {
    InsertToBigHeap(bigHeap, value);
  }

  console.log("大根堆", bigHeap);
  console.log("小根堆", littleHeap);

  if (bigHeapSize > littleHeapSize) {
    console.log("中位数: ", bigHeap[0]);
  } else if (bigHeapSize < littleHeapSize) {
    console.log("中位数: ", littleHeap[0]);
  } else {
    console.log("中位数: ", (littleHeap[0] + bigHeap[0]) / 2);
  }
}





export default {};