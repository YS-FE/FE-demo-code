/*
 局部声明文件(需要导出、导入才能使用) ，只能声明类型，不能声明实现
*/


export declare module Util {
    interface A {
        name: string;
        getName():void;
    }

    type MyPick<T, K extends keyof T> = {[P in K]: T[P]};
}

