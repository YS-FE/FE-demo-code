
type Arr = Array<Array<number>>;
type ArrIndex = {
    min: Array<number>;
    index: number;
}


/**
 * 选出不相交的区间最多的个数
 * @param arr 
 */
function getMax (arr: Arr): Arr {
    if (!arr && arr.length == 0) return null;
    let result: Arr = [];

    // [[1,5,4,0],[2,4,2,1],[3,5,2,2],[5,9,4,3],[6,8,2,4],[8,10,2,5]]
    arr.sort((a: Array<number>, b: Array<number>): number => {
        return a[0] - b[0];
    });

    let newArr = arr.map((e,i,a) => {
        return [...e, e[1] - e[0], i];
    });

    let currentIndex = 0;
    let currentArr = [0,0];
    while (true) {
        let minResult = findNext(currentArr, currentIndex, newArr);
        if (minResult.index == -1) break;

        result.push(minResult.min);
        currentArr = minResult.min;
        currentIndex = minResult.index;
    }

    return result;
}


function findMin (arr: Arr): ArrIndex {
    if (arr.length == 0) {
        return {
            min: null,
            index: -1
        };
    }

    let min = arr[0];
    let current = 0;
    for (let index = 1; index < arr.length; index++) {
        if (arr[index][2] < min[2]) {
            min = arr[index];
            current = arr[index][3];
        }
    }
    return {
        min,
        index: current
    };
}



function findNext (current: Array<number>, currentIndex: number, arr: Arr): ArrIndex {
    if (currentIndex == arr.length - 1) {
        return {
            min: null,
            index: -1
        }
    }

    let tempArr: Arr = [];
    for (let index = currentIndex ; index < arr.length; index++) {
        if (arr[index][0] >= current[1]) {
            tempArr.push(arr[index]);
        }
    }
    return findMin(tempArr);
}

let arr: Arr = [[2,4],[3,5],[1,5],[5,9],[6,8],[8,10]];
console.log(getMax(arr));


export default {}
