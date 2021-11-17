"use strict";

var matchingByConfig = function matchingByConfig(rule, value) {
    if (!rule) return false;
    var _toString = Object.prototype.toString;
    if (_toString.call(rule) == "[object String]") {
        return rule === value;
    } else if (_toString.call(rule) == "[object Array]") {
        return rule.indexOf(value) > -1;
    } else if (_toString.call(rule) == "[object Function]") {
        return rule(value);
    }
};

module.exports = {
    matchingByConfig: matchingByConfig
};