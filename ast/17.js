const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const delFn = require('./lib/index');


const str = `
import R2X, { AA, BB, CC as cc}  from '@r2x/r2x';


class  A  extends R2X.Component {
  
 
      
    handleClick() {
    
      var c = 200;
      
      if (process.env.R2X_ENV === 'rn') {
        let a = 10;
        console.log(a);
        console.log(BB)
      }  else if (process.env.R2X_ENV === 'h5') {
        let b = 20;
        console.log(b);
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
            process.env.R2X_ENV === 'h5' 
          }



      </View>
    );
  }

}
`;


function toStatements(path) {
  const node = path.node;

  if (path.isBlockStatement()) {
    let hasBlockScoped = false;

    for (let i = 0; i < node.body.length; i++) {
      const bodyNode = node.body[i];

      if (t.isBlockScoped(bodyNode)) {
        hasBlockScoped = true;
      }
    }

    if (!hasBlockScoped) {
      return node.body;
    }
  }

  return [node];
}

function extractVars(path) {
  const declarators = [];

  if (path.isVariableDeclaration({
    kind: "var"
  })) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = path.node.declarations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        const decl = _step5.value;
        const bindingIds = Object.keys(t.getBindingIdentifiers(decl.id));
        declarators.push(...bindingIds.map(name => t.variableDeclarator(t.identifier(name))));
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  } else {
    path.traverse({
      VariableDeclaration(varPath) {
        if (!varPath.isVariableDeclaration({
          kind: "var"
        })) return;
        if (!isSameFunctionScope(varPath, path)) return;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = varPath.node.declarations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            const decl = _step6.value;
            const bindingIds = Object.keys(t.getBindingIdentifiers(decl.id));
            declarators.push(...bindingIds.map(name => t.variableDeclarator(t.identifier(name))));
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

    });
  }

  if (declarators.length <= 0) return [];
  return [t.variableDeclaration("var", declarators)];
}


function replacePathIfConfident(path) {
  var evaluated = path.evaluate();
  if (evaluated.confident) {
    path.replaceWith(t.valueToNode(evaluated.value));
    return true;
  }
}


const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx', ['decorators', {
    'decoratorsBeforeExport': true
  }],      ["transform-define", {
    "process.env.R2X_ENV": "rn",
  }]]
});

traverse(ast, {
  IfStatement: {
    exit(path) {
        const consequent = path.get("consequent");
        const alternate = path.get("alternate");
        const test = path.get("test");
        let evalResult =  { confident: true , value: false};
        let isPure = false;
        const replacements = [];

        if (t.isBinaryExpression(test)) {
          const node = test.node;
          const left = node.left;
          const right = node.right;

          if (t.isMemberExpression(left) && t.isStringLiteral(right)) {
            if (generator(left).code === 'process.env.R2X_ENV') {

              const rightValue = node.right.value;

              if (rightValue === 'h5') {
                evalResult.value = true;
                isPure = true;
              }
            }
          }
        }



        if (evalResult.confident && !isPure && test.isSequenceExpression()) {
          replacements.push(t.expressionStatement(extractSequenceImpure(test)));
        } 
        
        
        // we can check if a test will be truthy 100% and if so then we can inline
        // the consequent and completely ignore the alternate
        //
        //   if (true) { foo; } -> { foo; }
        //   if ("foo") { foo; } -> { foo; }
        //


        if (evalResult.confident && evalResult.value) {
          path.replaceWithMultiple([...replacements, ...toStatements(consequent), ...extractVars(alternate)]);
          return;
        }
        
        // we can check if a test will be falsy 100% and if so we can inline the
        // alternate if there is one and completely remove the consequent
        //
        //   if ("") { bar; } else { foo; } -> { foo; }
        //   if ("") { bar; } ->
        //
        if (evalResult.confident && !evalResult.value) {
          if (alternate.node) {
            path.replaceWithMultiple([...replacements, ...toStatements(alternate), ...extractVars(consequent)]);
            return;
          } else {
            path.replaceWithMultiple([...replacements, ...extractVars(consequent)]);
          }
        } 
        
        // remove alternate blocks that are empty
        //
        //   if (foo) { foo; } else {} -> if (foo) { foo; }
        //


        if (alternate.isBlockStatement() && !alternate.node.body.length) {
          alternate.remove(); // For if-statements babel-traverse replaces with an empty block

          path.node.alternate = null;
        } 
        
        
        // if the consequent block is empty turn alternate blocks into a consequent
        // and flip the test
        //
        //   if (foo) {} else { bar; } -> if (!foo) { bar; }
        //


        if (consequent.isBlockStatement() && !consequent.node.body.length && alternate.isBlockStatement() && alternate.node.body.length) {
          consequent.replaceWith(alternate.node);
          alternate.remove(); // For if-statements babel-traverse replaces with an empty block

          path.node.alternate = null;
          test.replaceWith(t.unaryExpression("!", test.node, true));
        }

    }
  },
  // JSXExpressionContainer : {
  //   exit(astPath) {
  //     astPath.traverse({
  //       MemberExpression(astPath2) {
  //         if (generator(astPath2.node).code === 'process.env.R2X_ENV') {
  //             const rightValue = astPath2.getSibling('right').node.value;

  //             if (rightValue === 'rn') {
  //               astPath2.parentPath.replaceWith(template.ast('true'));

  //             } else if (rightValue === 'h5') {
  //               // astPath2.parentPath.replaceWith(template.ast('false'));

  //               const JSXExpressionContainer = astPath2.findParent(path => path.isJSXExpressionContainer());
  //               JSXExpressionContainer &&  JSXExpressionContainer.replaceWith(template.ast(`{}`))

  //             }
  //         }
  //       }
  //     });
  //   }
  // },


  'BinaryExpression|UnaryExpression': {
    exit: function exit(path) {
      replacePathIfConfident(path);
    }
  },

  ConditionalExpression: {
    exit: function exit(path) {
      var node = path.node;
      var testTruthy = path.get('test').evaluateTruthy();
      if (testTruthy === true) {
        path.replaceWith(node.consequent);
      } else if (testTruthy === false) {
        path.replaceWith(node.alternate);
      }
    }
  },

  LogicalExpression: {
    exit: function exit(path) {
      if (replacePathIfConfident(path)) return;

      var node = path.node;
      if (node.operator !== '&&') return;

      var leftTruthy = path.get('left').evaluateTruthy();
      if (leftTruthy === true) {
        path.replaceWith(node.right);
      }
    }
  },

});


const { code } = generator(ast);
const ast2 = parser.parse(code, {
  sourceType: 'unambiguous',
  plugins: ['jsx', ['decorators', {
    'decoratorsBeforeExport': true
  }]]
});

traverse(ast2, {
  ...(delFn().visitor)
});
const { code: code2,} = generator(ast2);
console.log(code2);

