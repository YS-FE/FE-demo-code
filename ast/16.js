const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const str = `
import R2X from '@r2x/r2x';


class  A  {
  
 
      
    handleClick() {
    
      var c = 200;
      
      if (process.env.R2X_ENV === 'rn') {
        let a = 10;
        console.log(a);
      } else if (process.env.R2X_ENV === 'h5') {
        let b = 20;
        console.log(b);
      } else if (xxx) {
        console.log('wtf');
      }
      
      
      console.log('hehehehhe');
    
    }
  
  

  render() {
  
    
  	return (
      <View className="notice">
          {/* title or 面包屑 */}
          {





              process.env.R2X_ENV === 'rn' && (
                  <View>
                      <StatusBar style={{ backgroundColor: '#ffffff' }} />
                      <NavBar background="#ffffff" theme="light" title="消息中心" />
                  </View>
              )





          }

          {




              process.env.R2X_ENV === 'h5' && process.env.BUILD_ENV === 'ADAPT_MICRO' && (
                  <roo.Breadcrumb items={microBreads} />
              )



          }

          {

            process.env.R2X_ENV === 'h5' ? <div>666666</div>: null 
          }
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

const codeCount = {
  rn: 0,
  pc: 0
}

traverse(ast, {

  // 统计 if 语句差异代码
  IfStatement(astPath) {
    const testPath = astPath.get('test');
    if (types.isBinaryExpression(testPath)) {
      const node = testPath.node;
      const left = node.left;
      const right = node.right;

      if (types.isMemberExpression(left) && types.isStringLiteral(right)) {
        if (generator(left).code === 'process.env.R2X_ENV') {
          const rightValue = node.right.value;
          const consequentSiblingNode = testPath.getSibling('consequent').node;
          const lineNum = consequentSiblingNode.loc.end.line - consequentSiblingNode.loc.start.line;

          if (rightValue === 'rn') {
            codeCount.rn += lineNum;
          } else if (rightValue === 'h5') {
            codeCount.pc += lineNum;
          }
        }
      }
    }
  },


  // 统计 组件渲染 差异代码
  JSXExpressionContainer(astPath) {
    const astNode = astPath.node;

    astPath.traverse({
      MemberExpression(astPath2) {
        if (generator(astPath2.node).code === 'process.env.R2X_ENV') {
            const expressionParent = astPath2.findParent((path) =>  (path.key === 'expression') && ( path.isConditionalExpression() || path.isLogicalExpression()));
            const lineNum =  expressionParent.node.loc.end.line - expressionParent.node.loc.start.line;

            const rightValue = astPath2.getSibling('right').node.value;
            if (rightValue === 'rn') {
              codeCount.rn += lineNum;
            } else if (rightValue === 'h5') {
              codeCount.pc += lineNum;
            }
        }
      }
    });
  }

});


// console.log(JSON.stringify(codeCount));


const { code } = generator(ast);
console.log(code);