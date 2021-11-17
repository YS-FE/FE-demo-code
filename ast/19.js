const postcss = require('postcss')
const precss = require('precss');
const fs = require('fs')
const path = require('path');
const klaw = require('klaw');
const postcssParser = require('postcss-scss');


function processCSS(CSSObj) {
    const convertKeys = Object.keys(CSSObj.app);
    const extraPCCSSKeys = Object.keys(CSSObj.pc);
    const extraPCCSS = CSSObj.pc;
    const copyPCCSS = {};
    let mergePCCSS = {};


    convertKeys.forEach(key => {
        const newKey = key.replace('.app', '.pc');
        copyPCCSS[newKey] = CSSObj.app[key];
    });


    extraPCCSSKeys.forEach(key => {

    });

}


async function delUseless(dir) {
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

                let enableCSSCopy = true;
                const content = fs.readFileSync(filePath);



                // 获得sass文件的ast 语法树
                const root = postcss([precss]).process(content, { parser: postcssParser.parse}).result.root;

                root.walkComments(comment => {
                    if (comment.text.trim() === 'css-copy disable') {
                        enableCSSCopy = false;
                    }
                });


                // 如果样式文件头部  不 包含 /*css-copy disable*/, 进行复制 app 类名到pc类名 的操作.
                if (enableCSSCopy) {
                    // 将手动添加的pc 样式临时保存
                    const pcNode = [];
                    root.walkRules((rule) => {
                        if (rule.selector.startsWith('.pc-') || rule.selector.startsWith('.r2xisom-pc-')) {
                            const clone = rule.clone();
                            pcNode.push(clone);
                            rule.remove();
                        }
                    });


                    // 保存需要复制为pc的样式
                    const pcCopyNode = [];
                    root.walkRules((rule) => {
                        if (rule.selector.startsWith('.app-only-')) return;

                        if (rule.selector.startsWith('.app-')) {
                            const clone = rule.clone();
                            clone.selector = rule.selector.replace('.app-', '.pc-');
                            pcCopyNode.push(clone);
                        }

                        if (rule.selector.startsWith('.r2xisom-app-')) {
                            const clone = rule.clone();
                            clone.selector = rule.selector.replace('.r2xisom-app-', '.r2xisom-pc-');
                            pcCopyNode.push(clone);
                        }
                    });


                    // 将复制的pc样式进行追加
                    pcCopyNode.forEach(node => {
                        root.append(node);
                    });


                    // 将手动添加的pc 样式，移动到样式文件最底部
                    pcNode.forEach(node => {
                        root.append(node);
                    });
                }



                fs.writeFileSync(filePath, root.toResult().css);
            });

            resolve();
        });
    });

    console.log('process done ~');
}


delUseless('./test_dir_2');

