
var assert = require('assert');
var delegate = require('..');

describe('.method(name)', function(){
  it('should delegate methods', function(){
    var obj = {};

    obj.request = {
      foo: function(bar){
        assert(this == obj.request);
        return bar;
      }
    };

    delegate(obj, 'request').method('foo');

    obj.foo('something').should.equal('something');
  })
})

describe('.getter(name)', function(){
  it('should delegate getters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return 'text/html';
      }
    }

    delegate(obj, 'request').getter('type');

    obj.type.should.equal('text/html');
  })
})

describe('.setter(name)', function(){
  it('should delegate setters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return this._type.toUpperCase();
      },

      set type(val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').setter('type');

    obj.type = 'hey';
    obj.request.type.should.equal('HEY');
  })
})

describe('.access(name)', function(){
  it('should delegate getters and setters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return this._type.toUpperCase();
      },

      set type(val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').access('type');

    obj.type = 'hey';
    obj.type.should.equal('HEY');
  })
})