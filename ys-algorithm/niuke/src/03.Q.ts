
 let arr: number[] = [5,6,6,4,3,10,8,9,6];
 let arr2: number[] = [5,6,6,4,3,10,8,9,6];

/**
 * 给定一个数组， 一个数字，将数组中小于等于该数字的放到数组左边，大于的放到右边
 * 时间复杂度 O(N)
 */
 function partion(arr: number[], l: number, r: number, num: number): void {
  if (!arr || arr.length < 2) return;
  let lessIndex: number = l - 1;

  // 只换分一个小于区域
  while (l <=  r) {
    if (arr[l] <= num) {
      swap(arr, ++lessIndex, l);
    }
    l++;
  }
}


 /**
  * 荷兰国旗问题: 给定一个数组， 一个数字，将数组中小于该数字的放到数组左边，大于的放到右边, 等于的放中间
  * 时间复杂度 O(N)
  */
 function partion2(arr: number[], l: number, r: number, num: number): void {
  if (!arr || arr.length < 2) return;
  let lessIndex: number = l - 1;
  let moreIndex: number = r + 1;

  //划分 小于区域， 大于区域, 中间自然变成等于区域
  while (l < moreIndex) {
    if (arr[l] < num) {
      swap(arr, ++lessIndex, l++);
    } else if (arr[l] > num) {
      swap(arr, l, --moreIndex);
    } else {
      l++;
    }
  }
}



 //交换
function swap(arr: number[], start: number, end: number) :void {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}


partion(arr, 0, arr.length - 1, 6);
console.log("划分之后的数组：", arr); // [ 5, 6, 6, 4, 3, 6, 8, 9, 10 ]

partion2(arr2, 0, arr2.length -1, 6);
console.log("划分之后的数组：", arr); // [ 5, 4, 3, 6, 6, 6, 8, 9, 10 ]

export default {};






