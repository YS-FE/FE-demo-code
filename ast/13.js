const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');
const { execSync } = require('child_process');


const result = execSync('git ls-files | xargs cat | wc -l');
console.log('-----------------');
console.log(result.toString().replace(/\s*/g, '')); // git  代码行数
console.log('-----------------');


const str = `
  function test () {
    console.log('start .....');
    let a = 10, b = 20, c = 30;
    console.log(a, b, c);

    // %%RN%%
    {
        if (arg.app) {
            const { bid, valLab, option } = arg.app;

            slx.mv(bid, valLab, option);
        }
    }


    console.log('middle.....');

    // %%MICRO%%
    {
        if (arg.micro) {
            const { bid, valLabCustom, options } = arg.micro;




            pc.slx.mv(bid, valLabCustom, options);
        }
    }


    console.log('end.....');
    
  }


  const a = () => (
    <R2XAdapter platform="RN">
      <View>6666</View>
      <View>6666</View>
      <View>6666</View>
      <View>6666</View>
      <View>6666</View>
      <View>6666</View>
    </R2XAdapter>
  );
`;

const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});




// 平台代码行数
const platformCode = {
  RN: 0,
  MICRO: 0,
  WEAPP: 0,
  H5: 0
};



traverse(ast, {
  BlockStatement(astPath) {
    const node = astPath.node;
    const leadingComments = astPath.node.leadingComments || [''];
    const lastCommentValue = ((leadingComments[leadingComments.length - 1]).value || '').replace(/\s+/g, '');

    if (/%%(.+)%%/g.test(lastCommentValue)) {
      let allEnv = [];
      lastCommentValue.replace(/%%(.+)%%/g, (m, p1) => { allEnv = p1.split('|') });

      // if (allEnv[0] === 'RN') {
      //   console.log('start', node.loc.start.line);
      //   console.log('end', node.loc.end.line);
      // }
      
      let codeLines = node.loc.end.line - node.loc.start.line + 1;
      if (allEnv.find(item => item === 'RN')) {
        platformCode.RN += codeLines;
      } 
      
      if (allEnv.find(item => item === 'MICRO')) {
        platformCode.MICRO += codeLines;
      }
    }
  },


  JSXOpeningElement(astPath) {
    // 平台代码剔除逻辑
    if (astPath.node.name.name === 'R2XAdapter') {

      // 代码行数
      const platformCodeLines =  astPath.parent.loc.end.line -  astPath.parent.loc.start.line - 1;

      astPath.traverse({
        JSXAttribute(astPath2) {
          const node = astPath2.node;

          if ((node.name.name === 'platform')) {
            const platform = node.value.value;

            switch (platform) {
              case 'RN':
                platformCode.RN += platformCodeLines;
                break;
              case 'MICRO':
                platformCode.MICRO += platformCodeLines;
                break;
              case 'H5':
                platformCode.H5 += platformCodeLines;
                break;
              case 'WEAPP':
                platformCode.WEAPP += platformCodeLines;
                break;
            }
          }
        }
      });
    }
  },
});



console.log(platformCode);
// const { code } = generator(ast);
// console.log(code);







