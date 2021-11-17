const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');

const str = `
  const a = 'hehe';
  const isRead = true;
  <View>
    <Text className={"notice-list app-notice-list pc-notice-list " + (isRead ? "had-read" : "xxx")  + "wtf" }>hello</Text>
    <Text className={"notice-list app-notice-list pc-notice-list " + isRead ? "had-read" : "" }>hello</Text>
    <Text className={"notice-list app-notice-list pc-notice-list " + "test01 "  + "test02" }>hello</Text>
    <Text className={a}>hello</Text>

  </View>
`;


// const str2 = "<Text className={`notice app-notice pc-notice ${isRead ? 'notice-has-read' : ''}  666 777  888`}>{title}</Text>";


const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});



traverse(ast, {
  JSXAttribute(astPath) {
    const attrName = astPath.node.name.name;

    if (attrName === 'className') {
      if (types.isJSXExpressionContainer(astPath.node.value)) {
        astPath.traverse({
          BinaryExpression(astPath2) {
            if (types.isStringLiteral(astPath2.node.left)) {
              astPath2.node.left.value = 'hello'
            }
          },
          TemplateElement(astPath2) {
            const node2 = astPath2.node;
            node2.value.raw = ' hello ';
            node2.value.cooked = ' hello ';
          }
        })
      }
    }
  }
});


const { code } = generator(ast);
console.log(code);







