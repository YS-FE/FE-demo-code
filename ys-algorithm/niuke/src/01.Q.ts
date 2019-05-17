/**
 * 数组的小和问题
 * 在一个数组中，每一个数左边比当前数小的数累加起来，叫做这个数组的小和
 */

let arr : number[] = [1, 2, 3, 4, 5];

/**
  * 求小和
  * @param arr
  */
function smallSum(arr : number[]) : number {
    if(!arr || arr.length < 2) 
        return 0;
    return mergeSort(arr, 0, arr.length - 1);
}

/**
  * 合并
  * @param arr
  * @param l
  * @param r
  */
function mergeSort(arr : number[], l : number, r : number) : number {
    if(l === r) 
        return 0;
    
    let mid: number = l + ((r - l) >> 1);

    /**
    * 左部分小和 + 右部分小和 + 左右合并时的小和
    */
    return mergeSort(arr, l, mid) + mergeSort(arr, mid + 1, r) + merge(arr, l, mid, r);
}

/**
  * 合并
  * @param arr
  * @param l
  * @param mid
  * @param r
  */
function merge(arr : number[], l : number, mid : number, r : number) : number {
        let i: number = 0,
        result: number = 0;
    let tempArry: number[] = [];
    let p1: number = l;
    let p2: number = mid + 1;

    while (p1 <= mid && p2 <= r) {
        result += arr[p1] < arr[p2]
            ? (r - p2 + 1) * arr[p1]
            : 0;
        tempArry[i++] = arr[p1] < arr[p2]
            ? arr[p1++]
            : arr[p2++];
    }

    while (p1 <= mid) {
        tempArry[i++] = arr[p1++];
    }

    while (p2 <= r) {
        tempArry[i++] = arr[p2++];
    }

    for (let index = 0; index < tempArry.length; index++) {
        arr[l + index] = tempArry[index];
    }

    return result;
}

console.log(smallSum(arr));

export default {};
