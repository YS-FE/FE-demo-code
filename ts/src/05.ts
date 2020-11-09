interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string


type K4 = "name" | "age";

type Obj = {
    [P in  K1]?: any
    // [P in  keyof Person]?: any
};

let objTest: Obj = {
    name: 'lisi',
    age: 10,
    location: 'hello',
}



function getProperty<T, K extends keyof T>({ obj, key }: { obj: T; key: K; }) {
    return obj[key];  // Inferred type is T[K]
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

let x = { foo: 10, bar: "hello!" };

let foo = getProperty({ obj: x, key: "foo" }); // number
let bar = getProperty({ obj: x, key: "bar" }); // string

// let oops = getProperty(x, "wargarbl"); // Error! "wargarbl" is not "foo" | "bar"
// setProperty(x, "foo", "string"); // Error!, string expected number


export  default {};
