
var type = require('..');

function assert(expected, val) {
  if (expected != type(val)) {
    throw new Error('expected "' + expected + '" for ' + val + ' but got "' + type(val) + '"');
  }
}

function Foo(){}

assert('object', {});
assert('object', new Foo);
assert('object', new Boolean(true));
assert('object', new Number(123));
assert('object', new String('whoop'));
assert('number', 12);
assert('string', "test");
assert('date', new Date);
assert('boolean', true);
assert('boolean', false);
assert('null', null);
assert('undefined', undefined);
assert('array', []);
assert('regexp', /asdf/);
assert('regexp', new RegExp('weee'));
assert('function', function(){});
assert('arguments', (function(){ return arguments })());
