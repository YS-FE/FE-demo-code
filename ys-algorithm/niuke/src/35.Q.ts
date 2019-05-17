/**
 * 一块金条切成两半，是需要花费和长度数值一样的铜板的。
 * 比如 长度为20的 金条，不管切成长度多大的两半，都要花费20个铜 板。
 * 一群人想整分整块金 条，怎么分最省铜板? 例如,给定数组{10,20,30}，代表一共三个人，整块金条长度为 10+20+30=60. 
 * 金条要分成10,20,30三个部分。 如果， 先把长 度60的金条分成10和50，花费60 再把长度50的金条分成20和30， 花费50 一共花费110铜板。
 *但是如果， 先把长度60的金条分成30和30，花费60 再把长度30 金条分成10和20，花费30 一共花费90铜板。
 *输入一个数组，返回分割的最小代价。
 */


function swap(arr: any[], from: number , to: number ) {
  let temp = arr[from];
  arr[from] = arr[to];
  arr[to] = temp;
}


//小根堆
class LittleHeap {
  public size: number;
  private data: number[];

  constructor(){
    this.size = 0;
    this.data = [];
  }

  //插入一个数
  insert(value: number) {
    let index: number = this.size;
    let parentIndex: number = parseInt((index - 1) / 2 + '');

    this.data[index] = value;
    this.size++;

    while (this.data[index] < this.data[parentIndex]) {
      swap(this.data, index, parentIndex);
      index = parentIndex;
      parentIndex = parseInt((index - 1) / 2 + '');
    }
  }

  //返回顶部最小值
  getTop(): number {
    if (this.size == 0) return;
    
    let result = this.data[0];
    swap(this.data, 0, --this.size);
    this.fixToLittleHeap(0);

    return result;
  }


  // 重新调整小根堆
  private fixToLittleHeap(index: number) {
    let left: number = 2 * index + 1;
    let min: number;
   
    while (left < this.size) {
      if (left + 1 < this.size) {
        min = (this.data[left] < this.data[left + 1]) ? left : left + 1;
      } else {
        min = left;
      }

      min = this.data[index] > this.data[min] ? min : index;
      if (index === min) break;

      swap(this.data, index, min);
      index = min;
      left = 2 * index + 1;
    }
  }

}


function getLessMoney(arr: number[]): number {
  if (!arr.length) return 0;

  let sum = 0;
  let littleHeap = new LittleHeap();

  arr.forEach(item => {
    littleHeap.insert(item);
  });

  while (littleHeap.size > 0) {
    let curr = littleHeap.getTop() + littleHeap.getTop();
    sum += curr;
    littleHeap.size && littleHeap.insert(curr);
  }

  return sum;
}


function main() {
  let arr: number[] = [20, 30, 10];
  console.log(getLessMoney(arr));
}

main();

export {};


