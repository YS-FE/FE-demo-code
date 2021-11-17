'use strict';

var helper = require('./helper');

var visitor = {
    ImportDeclaration: function ImportDeclaration(path) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},

            opts = _ref.opts || {};

        var specifiers = path.node.specifiers;
        // nodelist to be remove
        var removeNodeList = [];
        specifiers.forEach(function (item) {
            var name = item.local.name;
            var binding = path.scope.getBinding(name);
            if (binding && binding.kind === 'module') {
                var source = binding.path.parentPath.get('source');
                // unused import statement
                if (binding.referencePaths.length === 0) {
                    // exclude configuration values
                    if (!helper.matchingByConfig(opts.ignore, source.node.value)) {
                        removeNodeList.push(binding.path);
                        // remove the statement if the import items are completely remove
                        if (removeNodeList.length === specifiers.length) {
                            removeNodeList.push(binding.path.parentPath);
                        }
                    }
                }
            }
        });
        removeNodeList.forEach(function (node) {
            return node.remove();
        });
    }
};

module.exports = function () {
    return { visitor: visitor };
};