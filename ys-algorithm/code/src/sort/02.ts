

/**
 * @desc 查找无序数组中，第K大的元素
 * @param arr 
 * @param k 
 */
function findNum (arr: Array<number>, k :number): void {
    if (arr.length == 0) return;
    findNumberInner(arr, 0, arr.length - 1, k);
}

function findNumberInner (arr: Array<number>, l: number, r: number, k :number): void {
    if (l >= r) return;

    let i = parttion(arr, l, r);

    // 因为数组下标从0开始，所以， 要i + 1 比较
    if (i + 1 > k) {
        findNumberInner(arr, l, i - 1, k);
    } else if (i + 1 < k) {
        findNumberInner(arr, i + 1, r, k);
    } else {
        console.log(`第${k}大的数: `, arr[i]);
    }
}


function parttion (arr: Array<number>, l: number, r: number): number {
    let p = arr[r];
    let i = l, j = l;

    for (;j < r; j++) {
        //降序排列
        if (arr[j] > p) {
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


findNum([10,33,25,4,9,5,11], 2);

