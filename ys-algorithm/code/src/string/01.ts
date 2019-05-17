


/**
 * @description: 求字符串中最长的不串重复子串
 * @param {type} 
 * @return: 
 */
function getMaxSubstr (str: string): string {
    if (!str) return null;

    if (str.length == 1) {
        return str;
    }

    let book: Array<number> =  (new Array(256)).fill(0);
    let i = 0, j = 0, maxLen = 0, start = 0, end = 0;

    while (j < str.length) {
        if (book[str.charCodeAt(j)] === 1) {
            while (str[i] !== str[j]) {
                book[str.charCodeAt(i++)] = 0;
            }
            i++;
        }

        book[str.charCodeAt(j)] = 1;
        if ((j - i) > maxLen) {
            maxLen = j - i;
            start = i;
            end = j;
        } 
        j++;
    }

    return str.slice(start, end + 1);
}



/**
 * @description: 时间复杂度 O(N)
 * @param {type} 
 * @return: 
 */
function getMaxSubstr2 (str: string): string {
    if (!str) return null;

    if (str.length == 1) {
        return str;
    }

    let book: Array<number> =  (new Array(256)).fill(-1);
    let pre = -1, end = 0, maxLen = 0;

    for (let index = 0; index < str.length; index++) {
        pre = Math.max(pre, book[str.charCodeAt(index)]);
        if ((index - pre) > maxLen) {
            maxLen = index - pre;
            end = index;
        }
        book[str.charCodeAt(index)] = index;
    }

    return str.slice(pre + 1, end + 1);
}

function test (str: string):void {
    let substr = getMaxSubstr2(str);
    console.log('max substr =',substr);
}

test("abababcdefg");

export default getMaxSubstr;