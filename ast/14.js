const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const str = `
@pc()
@handle
@pc.Page()
class  A {

  render () {
  	return (
    
    	<a.default>
          hello world!

          <View style={[convertRnRealStyle(_styleSheetOriginal["coupon-wrapper"]), convertRnRealStyle(_styleSheetOriginal["app-test-01"]), convertRnRealStyle(_styleSheetOriginal["r2xisom-pc-test01"]), convertRnRealStyle(_styleSheetOriginal["r2xisom-app-test01"])]}>
            hello
           </View>
      </a.default>
    )
  }
}

`;

const str1 = '<Text style={_getStyle(`coupon-type ${disabledColor}`)}>{title}</Text>';

const ast = parser.parse(str1, {
  sourceType: 'unambiguous',
  plugins: ['jsx', ['decorators', {'decoratorsBeforeExport': true}]]
});

traverse(ast, {
  // ClassDeclaration(astPath) {
  //   fs.writeFileSync('./zz.json', JSON.stringify(astPath.node))
  // },
  // JSXOpeningElement(astPath) {
  //   const astNode = astPath.node;
  //   if (types.isJSXMemberExpression(astNode.name)) {
  //     console.log(astNode.name.object.name, astNode.name.property.name);
  //   }
  // },

  JSXAttribute(astPath) {
    const astNode = astPath.node;
    if (astNode.name.name === 'style') {
      astPath.traverse({
        MemberExpression(astPath2) {
          const astNode2 = astPath2.node;
          if (astNode2.object.name === '_styleSheetOriginal') {
            const originClassName = astNode2.property.value;
            if (originClassName === 'r2xisom-app-test01') {
              astNode2.property.value = 'r2xisom-pc-test01';
            }
          }
        },
        CallExpression(astPath2) {
          const astNode2 = astPath2.node;
          if (astNode2.callee.name === '_getStyle') {
            astPath.traverse({
              TemplateElement(astPath2) {
                const node2 = astPath2.node;
                const currentValue = node2.value.raw;
                node2.value.raw = ' aaa ';
                node2.value.cooked = ' bbb ';
              }
            })
          }
        }
      });
    }
  }
});



const { code } = generator(ast);
console.log(code);







