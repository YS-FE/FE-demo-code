

/**
 * 判断一个字符串中的字符是否只出现一次
 * 时间复杂度 O(N), 额外空间复杂度 O(1)
 */


//额外空间复杂度高
function isUnique (str: string): boolean {
    if (!str) {
        return false;
    }

    let arr: boolean[] = (new Array(256)).fill(false);
    for (let index = 0; index < str.length; index++) {
        if (arr[str.charCodeAt(index)]) {
            return false;
        }
    }
    return true;
}


/* 
使用 堆排序对字符串进行排序保证了 O(NlogN)时间复杂度 , O(1)空间复杂度 然后遍历判断
*/

function  isUnique2 (arr: string[]): boolean {
    if (arr.length === 0) {
        return false;
    }

    //排序
    heapSort(arr);

    //判断是否只出现一次
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === arr[index + 1]) {
            return false;
        }
    }

    return true;
}



/**
 * 堆排序
 * @param arr 
 */
function heapSort(arr: string[]) {

    //创建大根堆， 根节点最大
    for (let index = 0; index < arr.length; index++) {
        heapInsert(arr, index);
    }

    //不断的交换，进行排序。 得到从小到大的排序
    for (let len = arr.length - 1; len > 0 ; len--) {
        swap(arr, 0, len); //将最大值移动到最后
        heapfiy(arr, 0, len);
    }

}


function heapInsert(arr: string[], index: number) {
    let parentIndex = 0;
    while (index !== 0) {
        parentIndex = parseInt(((index - 1) / 2) + '');
        if (arr[parentIndex] < arr[index]) {
            swap(arr, parentIndex, index);
            index = parentIndex;
        }
    }
}


function heapfiy (arr: string[], index: number, len: number) {
    let left =   2 * index + 1;
    let right =   2 * index + 2;
    let largeIndex = index ;

    while (left < len) {
        if (arr[left] > arr[index]) {
            largeIndex = left;
        }

        if ((right < len) && (arr[right] > arr[largeIndex])) {
            largeIndex = right;
        }
        
        if (largeIndex !== index) {
            swap(arr, index, largeIndex);
        } else {
            break;
        }
    }
}



function swap(arr: string[], from: number, to: number) {
    let temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
}