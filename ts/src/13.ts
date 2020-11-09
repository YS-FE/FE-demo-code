


function f () {
  console.log("f called");
  return (target: any, key: any, desc: PropertyDescriptor) => {
    console.log("f  exec");
  }
}


function g() {
  console.log("g called");
  return (target: any, key: any, desc: PropertyDescriptor) => {
    console.log("g exec");
  }
}


function param() {
  console.log("param called");
  return (target: any, key: any, parameterIndex: number) => {
    console.log("param exec");
    console.log(">>>", target);
    console.log(">>>", key);
    console.log(">>>", parameterIndex);
  }
}


class Teacher {
  private name: string;
  private age: number;

  constructor(name: string , age: number) {
    this.name = name;
    this.age = age;
  }


  @f()
  @g()
  setName (@param() name: string) {
    this.name = name;
  }
}


let a:Teacher = new Teacher('lisi', 20);




export default {}