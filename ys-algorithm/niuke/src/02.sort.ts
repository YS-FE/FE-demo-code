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
  * 递归排序
  * @param arr 
  * @param l 
  * @param r 
  * @param fast 
  */
 function quickSortInner(arr: number[], l: number, r: number, fast?: boolean): void {
   if (l < r) {

     //随机交换最后一个数字，即可变成随机快排（因为每次都是找最后一个数字进行划分）
     fast && swap(arr, l + Math.floor(Math.random() * (r -l + 1)), r);

     let equalRange: number[] = partion(arr, l, r);
     quickSortInner(arr, l, equalRange[0] - 1);
     quickSortInner(arr, equalRange[1] + 1, r);
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