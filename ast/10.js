const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const fs = require('fs');


const file = `
import R2X, { Component, Config } from '@r2x/r2x';
import ImageIcon from '@/components/ImageIcon'; /* %%RN%% */
import Tab from '@/components/Tab'; //  %%H5%%
import Tag from '@/components/Tag'; //  %%RN%%
import store from './store'; // 666 
import './index.scss'; //  测试代码注释

const a = 10;
const b = 20;


if ('%%RN%%') {
  console.log('ifffffff');
}
`;

const ast = parser.parse(file , {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});


traverse(ast, {
  ImportDeclaration(astPath) {
    const trailingComments = astPath.node.trailingComments || [''];
    const firstCommentValue = (trailingComments[0].value || '').replace(/\s+/g, '');

    if (/%%(.+)%%/g.test(firstCommentValue)) {
      if (!firstCommentValue.includes('%%RN%%')) {
        astPath.remove();
      }
    }
  },
  IfStatement(astPath) {
    const testValue = (astPath.node.test.value || '').replace(/\s+/g, '');
    console.log('testValue = ', testValue);
  }
})


const { code } = generator(ast);
console.log(code);

