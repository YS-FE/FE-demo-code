interface Fn {
    (a: string, b: number):void;
}

// 定义函数的几种写法 
var test: Fn = (a: string, b: number ): void => {
    console.log('helloworld');
}

var test2 = (a: string, b: number):number => {
    return b;
}

interface Num {
    [index: number]: string;
}

interface Obj {
    [index: string]: number;
}

let a: Num[] = ['a', 'b'];
let b: Obj = {'age': 10, 'hobby': 20};

export default {};


