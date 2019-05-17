interface Dic<T> {
    [key: string]: T
}

let key: keyof Dic<number>;
let value: Dic<number>["foo"];

key = "hello";
value = 10;


interface Person {
    name: string;
    age: number;
    hobby: Array<any>
}

// Partial 官方标准库
type PartialPerson = Partial<Person>;
let one: PartialPerson = {
    name: 'lisi'
}

//Readonly 官方标准库
type ReadonlyPerson = Readonly<PartialPerson>;
let two: ReadonlyPerson = {
    name: 'lisi'
};
// two.name = 'zhangsan';

//Pick 官方标准库
type SomePerson = Pick<Person, "name"| "age">;
let three: SomePerson  = {
    name: 'lisi',
    age: 20,
}

//Record 官方标准库
type CoustomPerson = Record<'name' | 'gender', string>;
let four: CoustomPerson = {
    name: 'lisi',
    gender: 'male',
};


//追加属性
type PartialWithNewMember<T> = {
    [P in keyof T] ?: T[P]
}  & {
    memberName: boolean
};


type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;
type NonNullable<T> = Diff<T, null|undefined>;


function f1<T>(x: T, y: NonNullable<T>) {
    console.log(x, y);
}

f1({
    name: 'lisi',
    age: 20
}, {
   name: 'zhangsan',
   age: 33
});


interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
    updatePart2(newName: string): void;
}

type FunctionPropertyNames<T> = {[P in keyof T]: T[P] extends Function ? P : never}[keyof T];
type T1 = FunctionPropertyNames<Part>; //type T1 = "updatePart" | "updatePart2"

// {
//     updatePart: (newName: string) => void;
//     updatePart2: (newName: string) => void;
// }
type FunctionProperty<T> = Pick<Part, T1>; 



type NoNFunctonPropertyNames<T> = {[P in keyof T]: T[P] extends Function ? never : P}[keyof T];
type T2 = NoNFunctonPropertyNames<Part>; // type T2 = "id" | "name" | "subparts"

// {
//     id: number;
//     name: string;
//     subparts: Part[];
// }
type NoNFunctonProperty<T> = Pick<Part, T2>;


type Unpacked<T> = T extends Array<infer U> ? U : 
    T extends (...args: any[])=> infer U ? U: 
    T extends Promise<infer U> ? U : T;


export default {};
