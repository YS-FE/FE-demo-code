
/**
 * "A-1B12C--3" = (-1) + 12 + 3 = 8, 两个'-'为正， 一个'-'为负
 * 关键： num = num * 10 + (pos ? cur : -cur); pos代表正负
 * @description: 字符串中数字子串的求和 O(N)
 * @param {type} 
 * @return: 
 */
function sum (str: string): number {
    if (!str) {
        return 0;
    }

    let result = 0, pos = true, num = 0;

    for (let index = 0; index < str.length; index++) {
        let code = str.charCodeAt(index);
        let value = parseInt(str[index]);

        if ((code >= 48) && (code <= 57)) {
            //数字字符,求每个数字值
            num = num * 10 + (pos? value: (-value));
        } else {
            //非数字字符,负责进行累加
            result += num;
            num = 0;

            if (str[index] === '-') {
                if ((index >= 1)  && str[index - 1] === '-') {
                    pos = !pos;
                }
            } else {
                pos = true;
            }
        }
    }

    //循环结束之后，仍需要累加一次，防止出现以数字结尾时在循环中没有累加的问题
    result += num;

    return result;
}

export default sum;