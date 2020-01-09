let goods: number[] = [2,2,4,6,3];
let values: number[] = [3,4,8,9,6];
let n: number = 5;
let w: number = 9;

getMaxValue(goods, values, n, w);


function getMaxValue (goods: number[], values: number[], n: number, w: number) {
    let state: number[] = Array(w + 1).fill(0);
    state[goods[0]] = values[0];
    let maxValue = 0;

    for (let index = 1; index < n; index++) {
        for (let j = w - goods[index]; j >= 0; j--) {
            let newValue = state[j] + values[index];
            if (newValue > state[j + goods[index]]) {
                state[j + goods[index]] = newValue;
            }
        }
    }

    for (let j = w; j >= 0; j--) {
        if (state[j] > maxValue) maxValue = state[j];
    }
    console.log("maxValue = ", maxValue);

}





export default {}