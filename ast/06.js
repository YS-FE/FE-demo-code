

const defaultComponentNames = ['CardDemo', 'Home'];
const paths = ['/a/b', '/c/d'];

let str = ``;
let routes = ``;

defaultComponentNames.forEach((component,index) => {
  str += `import R2XComponent${index} from 'a'; \n`;
  routes += `{
    path: paths[${index}],
    component: R2XComponent${index}
  }`;
});


console.log(routes);

