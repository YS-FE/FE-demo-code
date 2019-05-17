type MyPartial<T> = {
    [P in keyof T]: T[P]
};

type Flatten<T> = T extends Array<infer U> ? U  : T;

type ObjectPartial<T> = {
    [P in keyof T]: T[P] extends object ? ObjectPartial<T[P]> : T[P]
};

type RecursePartial<T> = {
    //如果是数组就递归，确定数组的元素类型，如果是object，则递归判断对象的类型
    // [P in keyof T]: T[P] extends (infer U)[] ? RecursePartial<U>[] : T[P] extends object ? RecursePartial<T[P]> : T[P]
    [P in keyof T]: T[P] extends Array<infer U> ? RecursePartial<U>[] : T[P] extends object ? RecursePartial<T[P]> : T[P];
}

interface Person {
    name: string;
    age: number;
    hobby: Array<string>;
    address: {
        country: string,
        province: string
    }
}

//从 Person中抽离部分属性
type K1 = 'name' | 'age';
type PickPerson<T, K extends keyof T> = {
    [P in K]: T[P] 
}

type PartialPerson = PickPerson<Person, K1>;


export default {};




