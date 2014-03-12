/**
    Helper functions for testing
*/
var grape = require('grape');

grape.Test.prototype.closeTo = function isCloseTo(expected, actual, precision, message) {

    if (precision !== 0) {
          precision = precision || 3;
    }
    
    var ok = Math.abs(expected - actual) < (Math.pow(10, -precision) / 2);

    if (!ok) {
       message = (message || "") + " Expected " + actual + " to be close to " + expected + " (Difference: " + (expected - actual) + ", Precision: " + precision + ")";  
    }

    this._assert({
          ok: ok,
          message : message,
          operator : 'closeTo',
          expected : expected,
          actual : actual
        });      
}

