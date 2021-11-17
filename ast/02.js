const postcss = require('postcss')
const fs = require('fs')
const path = require('path');

const src = path.resolve('./css/01.css');
const css = fs.readFileSync(src);
const root = postcss.parse(css);

// console.log(JSON.stringify(root)); // CSS 抽象语法树



//  css 中 @相关的语法
// root.walkAtRules(rule => {
//   console.log(rule.name);
// })


// css 普通选择器语法
root.walkRules(rule => {
  if (rule.selector === '.r2x-card-list') {
    rule.remove();
  }
});


// 语法树生成 css
fs.writeFileSync('./css/xx.css', root.toResult().css);

