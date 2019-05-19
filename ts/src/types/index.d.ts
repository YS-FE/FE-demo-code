/*
 全局声明文件 ，只能声明类型，不能声明实现
*/


declare namespace TestModule{
    interface  A {
        name: string;
        age: number;
    }

    let  name: string;
    let  getName: ()=>string;
    
    namespace TestModuleInner {
        //...嵌套声明
        interface B {
            name: string;
        }
    }
}

declare module TestModule2{
    interface  A {
        name: string;
        age: number;
    }

    module  TestModule2Inner {
        //...
    }
}


declare class  Person {
    name: string;
    constructor(name: string);
    getName():string;
}


declare const jQuery: (a: string)=> any;

//函数声明重载
declare function $ (a: string): any;
declare function $(callback: ()=>any): any;



interface B {
    name: string;
    age: number;
    setName: (a: string)=>void;
}
