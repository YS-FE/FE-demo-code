const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');

const str = `
import A from 'A';
const a = 10;

<View>
  <A platform="pc">6666</A>
  <R2XAdapter platform="app">
    <Text>wtf</Text>
  </R2XAdapter>

  <R2XAdapter  platform="pc">
    <Text>wtf</Text>
  </R2XAdapter>
 </View>
`;

const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});


traverse(ast, {
  JSXOpeningElement(astPath, state) {
    if (astPath.node.name.name === 'R2XAdapter') {
      astPath.traverse({
        JSXAttribute(astPath2) {
          const node = astPath2.node;
          if ((node.name.name === 'platform') && (node.value.value === 'pc')) {
            astPath.parentPath.remove();
          }
        }
      });
    }
  },
  VariableDeclaration(astPath) {
    console.log('VariableDeclaration', astPath.node.kind);
  },
  ImportDeclaration(astPath) {
    const node = astPath.node;
    if (node.source.value === 'A') {
      astPath.remove();
    }
  }
});


const { code } = generator(ast);
console.log(code);







