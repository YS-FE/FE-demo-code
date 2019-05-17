/**
 * 堆排序 O(N) 假想成一颗完全二叉树
 */

 let arr: number[] = [4,5,6,3,2,1];

 function heapSort(arr: number[]): void {
   if (!arr || arr.length < 2) return;

   //创建大根堆
   for (let index = 0; index < arr.length; index++) {
     heapInsert(arr, index);
   }

   //对大根堆进行排序(变为有小到大的排序)
   let size: number = arr.length;
   swap(arr, 0, --size);
   while (size > 0) {
     heapify(arr, 0, size);
     swap(arr, 0, --size);
   }
 }


 /**
  * 创建大根堆
  * @param arr 
  * @param index 
  */
 function heapInsert(arr: number[], index: number): void {
   let parentIndex: number = parseInt((index - 1) / 2 + '');

   //大根堆
   while (arr[index] > arr[parentIndex]) {
     swap(arr, index, parentIndex);
     index = parentIndex;
     parentIndex = parseInt((index - 1) / 2 + '');
   }
 }

 /**
  * 大根堆某个节点值更改时，重新调整为大根堆(即节点下沉)
  * @param arr 
  * @param index 
  * @param size 
  */
 function heapify(arr: number[], index: number, size: number){
   let left:number =  2 * index + 1;

   while (left < size) {
     let largest = (left + 1 < size) && (arr[left + 1] > arr[left]) ? left + 1 : left;
     largest = arr[index] > arr[largest] ? index: largest;

     if (index === largest) break;

     swap(arr, index, largest);
     index = largest;
     left = 2 * index + 1;
   }
 }


 function swap(arr: number[], start: number, end: number) {
   let temp = arr[start];
   arr[start] = arr[end];
   arr[end] = temp;
 }

 heapSort(arr);
 console.log("堆排序", arr);

 export default {};