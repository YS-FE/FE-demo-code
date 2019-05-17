let arr : number[] = [5, 4, 3, 2, 1];
let copyArr : number[] = arr.map((item : number) => item);

console.log("原数组: ", copyArr);

/**
 * 冒泡排序 O(N^2)
 * @param arr
 */
function bubbleSort(arr : number[]) : void {
    if(!arr || arr.length < 2) 
        return;
    
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) 
                swap(arr, j, j + 1);
            }
        }
}

/** ================================================= **/

/**
 * 选择排序 O(N^2)
 * @param arr
 */
function selectSort(arr : number[]) : void {
    if(!arr || arr.length < 2) 
        return;
    let minIndex: number;

    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            swap(arr, i, minIndex);
        }
    }
}

/** ================================================= **/

/**
 * 插入排序 O(N^2) ~ O(N)
 * @param arr
 */
function insertSort(arr : number[]) : void {
    if(!arr || arr.length < 2) 
        return;
    
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
            swap(arr, j, j + 1);
        }
    }
}

/** ================================================= **/

//交换
function swap(arr : number[], start : number, end : number) : void {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
}

/** ================================================= **/

/**
 * 归并排序 O(N * logN) 分而治之, 额外空间复杂度O(N)
 * @param arr
 */
function mergeSort(arr : number[]) : void {
    if(!arr || arr.length < 2) 
        return;
    mergeProcess(arr, 0, arr.length - 1);
}

function mergeProcess(arr : number[], l : number, r : number) : void {
    if(l === r) 
        return;
    
    let mid: number = l + (r - l) >> 1;
    mergeProcess(arr, l, mid);
    mergeProcess(arr, mid + 1, r);
    merge(arr, l, mid, r);
}

/**
 * 左右排序合并
 * @param arr
 * @param l
 * @param mid
 * @param r
 */
function merge(arr : number[], l : number, mid : number, r : number) : void {
    let i: number = 0;
    let p1: number = l;
    let p2: number = mid + 1;
    let tempArr: number[] = [];

    while (p1 <= mid && p2 <= r) {
        tempArr[i++] = arr[p1] > arr[p2]
            ? arr[p2++]
            : arr[p1++];
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
}

/** ================================================= **/
// bubbleSort(arr); selectSort(arr); insertSort(arr);
mergeSort(arr);
console.log("排序之后数组: ", arr);

export default {};