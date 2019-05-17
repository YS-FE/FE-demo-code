"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
/**
 * new (): T  意思是 构造函数类型，而不是实例类型
 */
//构造函数没有参数时
function createInstance(constructor) {
    return new constructor();
}
//构造函数有指定类型的参数时
function createInstance2(constructor) {
    return new constructor('zhangsan', 20);
}
//构造函数有指定类型的参数时的 另一种形式写法
function createInstance3(constructor) {
    return new constructor('wangwu', 30);
}
class ClassFactory {
    create(type) {
        return new type('lisi', 10);
    }
}
;
let instance = (new ClassFactory()).create(Animal);
let instance2 = createInstance2(Animal);
let instance3 = createInstance3(Animal);
console.log('instance', instance);
console.log('instance2', instance2);
console.log('instance3', instance3);
exports.default = {};
//# sourceMappingURL=03.js.map