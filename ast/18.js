const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const str = `
import R2X, { AA, BB, CC as cc}  from '@r2x/r2x';

class  A  extends R2X.Component {
  render() {
  	return (
      <View className="notice-app-xx  yy-zz">
        sdjgksjgljdslghjlsdjhglkdsjkhjdmsh
      </View>
    );
  }

}
`;




const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx', ['decorators', {
    'decoratorsBeforeExport': true
  }]]
});

traverse(ast, {
  JSXAttribute: {
    enter(astPath) {
        const node = astPath.node;
        const attrName = node.name.name
        if (attrName === 'className') {
          let originClass = generator(astPath.node).code;
          newClass = originClass.replace(/app/g, 'pc');
          // astPath.replaceWith(template.ast(newClass));
        }
      }
    }
});


const { code } = generator(ast);
console.log(code);