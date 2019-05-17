

/**
 * @description: 去掉字符串中指定个数的连续的'0', 假设字符串的长度 大于指定的个数
 * @param {String} str 
 * @param {Number} num 
 * @return: 
 */
function removeSomeZero (str: string, num: number): string {
    if ((!str) || (!str.includes('0'))) {
        return '';
    }

    let count: number = 0, start: number = 0;
    let strArray = str.split('');

    for (let index = 0; index < strArray.length; index++) {
        if (strArray[index] === '0') {
            count++;
            start = start === -1 ? index : start;
        } else {
            if (count === num) {
                while (count--) {
                    strArray[start++] = '*';
                }
            }
            start = -1;
            count = 0;
        }
    }

    if (count === num) {
        while (count--) {
            strArray[start++] = '*';
        }
    }


    return strArray.join('').replace(/\*/g, '');
}


function test (str: string, num: number): void {
    console.log(removeSomeZero(str, num));
}

export default  removeSomeZero;