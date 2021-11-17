const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const str = `
import { observer } from 'mobx-react';
import React from 'react';
const info = 'https://p0.meituan.net/wmadfe/a1e4d802a4d77c6a68f3a483d3a380bd2527.png';
const infoRed = 'https://p0.meituan.net/wmadfe/53d7c32195111cb8d701992071fa9fe72582.png';
const splitBg = 'https://p0.meituan.net/wmadfe/4147c15a59da63b180c091f60a329b97703.png';
const subIcon = 'https://p0.meituan.net/wmadfe/a8a30636e3c591a9a66b8acf816cb1a615543.png';

import Store from './store';
import './index.scss';
`;


const ast = parser.parse(str, {
  sourceType: 'unambiguous',
  plugins: ['jsx', ['decorators', {'decoratorsBeforeExport': true}]]
});

traverse(ast, {
  ImportDeclaration(astPath) {
    if (astPath.key === 0) {
      const siblings = astPath.getAllNextSiblings();
      const allPaths = [astPath, ...siblings];
      const allTypes = astPath.container.map(item => item.type);
      const lastImportIndex = allTypes.lastIndexOf('ImportDeclaration');
      const lastImportPath = allPaths[lastImportIndex];

      const removeConst = [];

      allPaths.slice(0, lastImportIndex + 1).forEach((item, index) => {
        if ((item.node.type === 'VariableDeclaration') && (item.node.kind === 'const')) {
          removeConst.push(item.node);
          item.remove();
        }
      });

      lastImportPath.insertAfter(removeConst);
    }
  }
});



const { code } = generator(ast);
console.log(code);







