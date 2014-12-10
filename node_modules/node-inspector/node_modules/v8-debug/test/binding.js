var expect = require('chai').expect;

describe('Binary source', function() {
  var binding;
  it('was builded and can be accessed from script', function() {
    binding = require('../build/Release/debug');
    expect(binding).to.be.instanceof(Object);
  });
});