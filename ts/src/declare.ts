import {Util} from './types/one';

let t1: TestModule.A = {
    name: 'hello',
    age: 20
};

let t11: TestModule.TestModuleInner.B = {
    name: 'lisi'
};



//全局 声明的Person  class s
// let c1: Person = new Person('lisi');
// c1.getName();



// 全局中声明了$ jQuery
// let t3 = $('#id');
// let t4 = $(function():string{
//     return 'hello';
// });
// let t5 = jQuery('.class');


let t6: Util.A = {
    name: 'lisi',
    getName() {
        return 'hello';
    }
}

console.log('t6 = ', t6);



let t7: B = {
    name: 'lisi',
    age: 10,
    setName(a: string):void {
        console.log('hehe');
    }
}

export default {};


