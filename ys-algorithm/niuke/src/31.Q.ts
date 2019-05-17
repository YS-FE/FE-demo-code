/**
 * 布隆过滤器
 */


// m = n * lnP / (ln2)^2 所需的bit个数
// k = ln2 * (m/n)  所需哈希函数的个数
// 失误率 (1 - e ^(-n *k /m))^k 
    

let arr = new Int32Array(1000);// 1000 * 32 个bit位

let num = 30000;
let arrIndex = Math.floor(num / 32);
let bitIndex = 30000 % 32;

arr[arrIndex] = arr[arrIndex] | (1 << bitIndex);



