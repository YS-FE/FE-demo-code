/**
 * 逆序对问题
 * 数组当前元素大于后边的数，则组成一个逆序对
 */

 let arr: number[] = [10, 11, 13, 9, 7, 8];

 /**
  * 输出所有逆序对
  * @param arr 
  */
 function  inversePair(arr: number[]): number {
   if (!arr || arr.length < 2) return;
   return mergeSort(arr, 0, arr.length - 1);
 }


 function mergeSort(arr: number[], l: number, r: number): number {
   if (l === r) return 0;

   let mid = l + ((r - l) >> 1);
   return mergeSort(arr, l, mid) + 
          mergeSort(arr, mid + 1, r) + 
          merge(arr, l, mid, r);
 }

 function merge(arr: number[], l: number, mid: number, r: number): number{
   let i: number = 0, result: number = 0;
   let tempArr: number[] = [];
   let p1: number = l;
   let p2: number = mid + 1;

   while (p1 <= mid && p2 <= r){
     if (arr[p1] > arr[p2]) {
       for (let index = p2; index <=r ; index++) {
         result += 1;
         console.log("逆序对 [", arr[p1], arr[index], "]");
       }
     }
     tempArr[i++] = arr[p1] > arr[p2] ? arr[p1++] : arr[p2++];
   }

   while (p1 <= mid) {
     tempArr[i++] = arr[p1++];
   }

   while (p2 <= r) {
     tempArr[i++] = arr[p2++];
   }

   for (let index = 0; index < tempArr.length; index++) {
     arr[l + index] = tempArr[index];
   }

   return result;
 }

 console.log(inversePair(arr));
 console.log(arr);

 export default {};