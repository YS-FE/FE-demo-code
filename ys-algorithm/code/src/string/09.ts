
/**
 * @description: 在一个含有 null并且按照字典从小到大排序的数组中
 * 查找 某个字符最左出现的位置
 * @param {strs} 字符串数组 
 * @param {str} 字符串
 * @return: 
 */
function getIndex (strs: string[], str: string):number {
    if (!strs || !str || strs.length === 0) {
        return -1;
    }
    
    let res: number = -1, left = 0, right = strs.length - 1;
    let mid = 0, temp = 0;

    while (left <= right) {
        mid = parseInt((left + right) / 2  + '');
        if (strs[mid] &&  strs[mid] === str) {
            res = mid;
            right = mid - 1;
        } else if (strs[mid]) {
            if (strs[mid] < str) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        } else if (!strs[mid]) {
            temp = mid;
            while (!strs[temp] && --temp > left);
            if (temp < left || strs[temp] < str) {
                left = mid + 1;
            } else {

                res = strs[temp] === str ? temp : res;
                right = mid - 1;
            }
        }
    }

    return res;
}


export default getIndex;