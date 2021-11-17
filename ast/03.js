const postcss = require('postcss')
const precss = require('precss');
const fs = require('fs')
const path = require('path');
const klaw = require('klaw');



// const src = path.resolve('./css/02.scss');
// const scss = fs.readFileSync(src);
// const root = postcss([precss]).process(scss).result.root;
// console.log(JSON.stringify(root));



async function  delUseless (dir) {
  let filePaths = [];

   await new Promise((resolve, reject) => {
     klaw(dir)
      .on('data', (item) => {
        const extname = path.extname(item.path);
        if (/^\.(css|sass|scss|less)$/g.test(extname)) {
          filePaths.push(item.path);
        }
      }).once('end', () => {

        filePaths.forEach(filePath => {
          const content = fs.readFileSync(filePath);

          // 获得sass文件的ast 语法树
          const root = postcss([precss]).process(content).result.root;

          root.walkRules(rule => {
              if (rule.selector === '.r2x-card-list') {
                  rule.remove();
              }
          });

          fs.writeFileSync(filePath, root.toResult().css);
        });

        resolve();
      });
   });

   console.log('process done ~');
}


delUseless('./test_dir');