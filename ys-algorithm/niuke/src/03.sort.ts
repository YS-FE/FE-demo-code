/**
 * 经典快排 最好情况 O(N * logN),和数据状况有关, 最差 O(N^2)
 * 随机快排 长期期望 O(N * logN), 额外空间复杂度长期期望 O(logN)
 */

let arr: number[] = [10, 9, 8, 7, 6,12, 6, 2, 6, 5, 6];

/**
 * 快排
 * @param arr 
 * @param fast true || false, 是否是随机快排
 */
function quickSort(arr: number[], fast?: boolean): void{
  if (!arr || arr.length < 2) return;
  quickSortInner(arr, 0, arr.length - 1, fast);
}

/**
 * 非递归排序
 * @param arr 
 * @param l 
 * @param r 
 * @param fast 
 */
function quickSortInner(arr: number[], l: number, r: number, fast?: boolean): void {

  let stack: number[] = [];
  stack.push(l);
  stack.push(r);

  while (stack.length > 0) {
    let right: number = stack.pop();
    let left: number = stack.pop();

    // 如果最大索引小于等于左边索引，说明结束了
    if (right <= left) continue;

    fast && swap(arr, left + Math.floor(Math.random() * (right -left + 1)), right);
    let equalRange: number[]  = partion(arr, left, right);

    if (left < equalRange[0] - 1) {
        stack.push(left);
        stack.push(equalRange[0] - 1);
    }
    if (equalRange[1] + 1 < right) {
        stack.push(equalRange[1] + 1);
        stack.push(right);
    }
  }
}


/**
 * 划分区域： 返回等于区域的范围
 * @param arr 
 * @param l 
 * @param r 
 */
function partion(arr: number[], l: number, r: number): number[]{
   let lessIndex = l -1;
   let moreIndex = r;

   //每次用最后一个数字作为比较的数字
   while (l < moreIndex) {
     if (arr[l] < arr[r]){
       swap(arr, ++lessIndex, l++);
     } else if (arr[l] > arr[r]) {
       swap(arr, --moreIndex, l);
     } else {
       l++;
     }
   }

   //将最后一个数字交换到相等区域
   swap(arr, moreIndex, r);
   return [lessIndex + 1, moreIndex];
}


 //交换
function swap(arr: number[], start: number, end: number) :void {
 let temp = arr[start];
 arr[start] = arr[end];
 arr[end] = temp;
}



quickSort(arr);
console.log("经典快排", arr); // [2, 5, 6, 6, 6, 6, 7, 8, 9, 10, 12 ]

quickSort(arr, true);
console.log("随机快排", arr); // [2, 5, 6, 6, 6, 6, 7, 8, 9, 10, 12 ]

export default {};