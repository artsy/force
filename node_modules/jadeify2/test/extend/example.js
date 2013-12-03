var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head></head></html><body>Hello, World!</body>');
}
return buf.join("");
}
