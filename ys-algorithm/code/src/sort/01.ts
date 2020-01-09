
// 注意边界条件
// 插入排序
function insertSort (arr: Array<number>): Array<number> {
    if (arr.length < 2) return arr;

    //未排序区域
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];
        let j = i - 1;

        //已排序区域
        for (; j >= 0; j--) {
            if (arr[j] > value) {
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }

        arr[j + 1] = value;
    }

    return arr;
}


// 归并排序
function mergeSort(arr: Array<number>): Array<number> {
    if (arr.length < 2) return;
    mergePart(arr, 0, arr.length - 1);
    return arr;
}

function mergePart(arr: Array<number>, l: number, r:number): void {
    if (l >= r) return;

    let  mid = Math.floor((l + r) / 2);
    mergePart(arr, l, mid);
    mergePart(arr, mid + 1, r);
    mergeResult(arr, l, mid, r);
}

function mergeResult (arr: Array<number>, l: number, mid: number, r: number): void {
    let p1 = l;
    let p2 = mid + 1;
    let temp: Array<number> = [];
    let i = 0;

    while ((p1 <= mid)  && (p2 <= r)) {
        temp[i++] = arr[p1] < arr[p2] ? arr[p1++]  : arr[p2++];
    }

    while (p2 <= r) {
        temp[i++] = arr[p2++];
    }
    while (p1 <= mid) {
        temp[i++] = arr[p1++];
    }

    for (let i = 0; i < temp.length; i++) {
        arr[l + i] = temp[i];
    }
}



// 快排
function qSort(arr: Array<number>): Array<number> {
    if (arr.length < 2) return arr;
    qSortPart(arr, 0, arr.length - 1);
    return arr;
}


function qSortPart (arr: Array<number>, l: number, r: number):void{
    if (l >= r) return;
    let p = parttion(arr, l, r);
    qSortPart(arr, l, p - 1);
    qSortPart(arr, p + 1, r);
}

function parttion(arr: Array<number>, l: number, r: number): number {
    let p = arr[r];
    let i = l, j = l;

    for (; j <= r - 1; j++) {
        //升序排列
        if (arr[j] < p) {
            swap(arr, i, j);
            i++;
        }
    }
    swap(arr, i , r);
    return i;
}

function swap(arr: Array<number>, src: number, dest: number): void {
    let temp = arr[src];
    arr[src]  = arr[dest];
    arr[dest] = temp;
}



// console.log(mergeSort([6,5,4,3,2,1]));
// console.log(insertSort([6,5,4,3,2,1]));
console.log(qSort([6,5,4,3,2,1]));



export default {}