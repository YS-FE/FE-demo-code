

/**
 * 整数 只有 3 、5 、7因子,按照大小排序，求第k个元素的值
 * @param k 
 */
function findMin (k: number): number {
    let arr: number[] = [3,5,7];
    let num3 = 0, num5 = 0, num7 = 0;

    for (let i = 0; i < k; i++) {
        arr[i] = Math.min(arr[num3]* 3, arr[num5] * 5, arr[num7] * 7);
        if (arr[i] === arr[num3] * 3) {
            num3 += 1;
        }
        if (arr[i] === arr[num5] * 5) {
            num5 += 1;
        }
        if (arr[i] === arr[num3] * 3) {
            num3 += 1;
        }
    }

    return arr[k - 1];
}