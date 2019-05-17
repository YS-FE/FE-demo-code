/**
 * 数组划分奇数偶数两部分, 左边奇数，右边偶数
 */

let arr : number[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
];

function splitArr(arr : number[]) : void {
  if(!arr || arr.length < 2) 
    return;
  
  let start: number = 0;
  let end: number = arr.length - 1;

  while (start < end) {
    while (arr[start] % 2 !== 0 && start < end) {
      start++;
    }

    while (arr[end] % 2 === 0 && start < end) {
      end--;
    }
    swap(arr, start, end);
  }
}

//交换
function swap(arr : number[], start : number, end : number) : void {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}

splitArr(arr);
console.log(arr);

export default {};
