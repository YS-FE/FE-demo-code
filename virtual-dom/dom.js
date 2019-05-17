
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}


function createElement (type, props, children) {
    return new Element(type, props, children);
}


function render (nodeObj) {
    let el = document.createElement(nodeObj.type);

    for (const key in nodeObj.props) {
        setAttribute(el, key, nodeObj.props[key]);
    }

    nodeObj.children.forEach(child => {
        let childEl = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(childEl);
    });
    
    return el;
}


function setAttribute (node, key, value) {
    switch(key) {
        case 'value':
            if ((node.tagName.toLowerCase() === 'input') || (node.tagName.toLowerCase() === 'textarea')) {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText =  value;
            break;
        default:
            node.setAttribute(key, value);
    }
}


function renderDom (el, root) {
    root.appendChild(el);
}

/**********************************/

let currentPatchIndex = 0;

/**
 * @description:  节点diff
 * @param {type} 
 * @return: 
 */
function diff (newTree, oldTree) {
    let patches = {};
    let index = 0;

    traverse(oldTree, newTree, index, patches);
    return patches;
}


function isString (node) {
    return typeof node == 'string';
}

function traverse (oldNode, newNode, index, patches) {
    let currentPatch = [];

    if (!newNode) {
        currentPatch.push({type: 'REMOVE', index: index});
    } else if (isString(newNode) && isString(oldNode)) {
        if (newNode != oldNode) {
            currentPatch.push({type: 'TEXT', text: newNode});
        }
    } else if (newNode.type === oldNode.type) {
        let attr = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attr).length > 0) {
            currentPatch.push({type: 'ATTR', attr: attr});
        }
        diffChild(oldNode.children, newNode.children, patches);
    } else {
        currentPatch.push({type: 'REPLACE', newNode: newNode});
    }

    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffAttr (oldAttrs, newAttrs) {
    let patch = {};

    for (const key in oldAttrs) {
        if (oldAttrs[key] != newAttrs[key]) {
            patch[key] = newAttrs[key];
        }
    }

    for (const key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }

    return patch;
}


function diffChild (oldChildren, newChildren, patches) {
    oldChildren.forEach((child, index) => {
        traverse(child, newChildren[index], ++currentPatchIndex, patches);
    })
}


/**********************************/

let allPatches,  patchIndex = 0 ;
/**
 * @description: 打补丁
 * @param {type} 
 * @return: 
 */
function patch (node, patches) {
    allPatches = patches;
    walk(node);
}


function walk (node) {
    let patch = allPatches[patchIndex++];
    node.children.forEach(child => {
        walk(child);
    });

    if (patch) {
        doPatch(node, patch);
    }
}

function doPatch (node, patches) {
    patches.forEach(patch => {
        switch(patch.type) {
            case 'ATTR':
                for (const key in patch.attr) {
                    let value = patch.attr[key];
                    if (value) {
                        setAttribute(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = newNode instanceof Element ? render(newNode) :  document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
        }
    });
}


/**********************************/

/**
 * @description:  测试
 */
function test() {
    let virtualDom = createElement('ul', {class: 'list'}, [
        createElement('li', {class: 'item'}, ['周杰伦']),
        createElement('li', {class: 'item'}, ['林俊杰']),
        createElement('li', {class: 'item'}, ['王力宏'])
    ]);
    
    console.log(render(virtualDom));
}

test();









