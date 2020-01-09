
let goods: number[] = [2,2,4,6,3];
let values: number[] = [3,4,8,9,6];
let n: number = 5;
let w: number = 9;
let maxValue: number = -1;

getMaxValue(0, 0, 0);
console.log('maxValue = ', maxValue); //18, 4 + 8 + 6


function getMaxValue (index: number, currWeight: number,  currValue: number ) {
    if (currWeight == w || index == n) {
        if (currValue > maxValue) {
            maxValue = currValue;
        }
    }

    getMaxValue(index + 1, currWeight, currValue);
    if (currWeight + goods[index] <= w) {
         getMaxValue(index + 1, currWeight + goods[index], currValue + values[index]);
    }
}




export default {}