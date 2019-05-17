
interface Person {
    name: string;
    age: number;
}

function pick<T, K extends keyof T>(obj: T, names: K[]): T[K][]  {
    return names.map(e => obj[e]);
}


function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
    return obj[name];
}


let xiao: Person = {
    name: 'lisi',
    age: 10
}


let values: string[] = pick(xiao, ["name"]);
console.log(values);


export default {};