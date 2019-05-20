
class Teacher {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

}


/**
 * 使用 export = xxx   进行模块导出时，需要只用特定的方式引入
 * 
 * import Teacher  = require('./09');
 */
export = Teacher;