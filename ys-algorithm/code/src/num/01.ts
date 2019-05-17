
/**
 * 返回 一个 0< num < 1 浮点数的二进制字符串
 * @param num  浮点类型数据
 */
function genBinary (num: number): string {
    let str: string = '';
    let base: number = 0.5;
    
    while (num > 0) {
        if (num >= base) {
            num -= base;
            str += '1';
        } else {
            str += '0';
        }

        base /= 2;
        if (str.length > 32) {
            return 'Error';
        }
    }

    return str;
}


console.log(genBinary(0.6666));

export default genBinary;