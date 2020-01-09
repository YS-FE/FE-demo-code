/**
 * KMP算法  O(n+m)
 * 重点：
 * 1. 什么是字符串的 前缀子串、后缀子串
 * 2. 什么是部分匹配规则
 * 3. 什么是next? next 如何计算
 */

function strPattern (src: string, p: string): number {
    let i = 0, j = 0;
    let next = getNext(p);

    while (i < src.length && j < p.length) {
        if (j === -1 || src[i] === p[j]) {
            i++;
            j++;
        } else {
            j = next [j];
        }
    }

    if (j === p.length) {
        return i - j;
    } 

    return -1;
}


function getNext (p: string): Array<number> {
    let j = 0, k = -1;
    let next: Array<number> = [];

    while ( j < p.length - 1) {
        if (k === -1 || p[j] === p[k]) {
            j++;
            k++;
            next[j] = k;
        } else {
            k = next[k];
        }
    }

    return next;
}

let result = strPattern("BBC ABCDAB ABCDABCDABDE", "ABCDABD")

export default {}