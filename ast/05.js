const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');

const str = fs.readFileSync('./04.js').toString();
const ast = parser.parse(str);



traverse(ast, {
  Program: {
    exit(path) {
      const node = path.node;
      node.body.unshift(template.ast(`import React from 'react';`));
    }
  },

  Identifier(path) {
    if ((path.key === 'superClass') && (path.node.name === 'Component')) {
      path.node.name = 'React.Component';
    }

    if ((path.key === 'object') && (path.node.name === 'R2X') && (path.parentPath.key === 'superClass') && (path.parent.property.name === 'Component')) {
      path.node.name = 'React';
    }
  }

});



const { code } = generator(ast);
console.log(code);







