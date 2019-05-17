class Animal {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}


/**
 * new (): T  意思是 构造函数类型，而不是实例类型
 */


//构造函数没有参数时
function createInstance<T> (constructor: {new (): T;}): T {
    return new constructor();
}


//构造函数有指定类型的参数时
function createInstance2<T> (constructor: {new (name: string, age: number): T;}): T {
    return new constructor('zhangsan', 20);
}

//构造函数有指定类型的参数时的 另一种形式写法
function createInstance3<T> (constructor: new (name: string, age: number) => T): T {
    return new constructor('wangwu', 30);
}


class ClassFactory<T> {
    create(type: {new (name: string, age: number): T;}): T {
        return new type('lisi', 10);
    }
};



let instance = (new ClassFactory<Animal>()).create(Animal);
let instance2 = createInstance2<Animal>(Animal);
let instance3 = createInstance3<Animal>(Animal);

console.log('instance', instance);
console.log('instance2', instance2);
console.log('instance3', instance3);


export default {};