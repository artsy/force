/**
    Number properties tests
*/

var grape = require('grape'),
    math = require('../../');

grape('For powers of two', function(t) {
    t.plan(8);

    t.ok(math.numbers.isPowerOfTwo(256));

    t.ok(math.numbers.isPowerOfTwo(4096));

    t.notOk(math.numbers.isPowerOfTwo(0));

    t.ok(math.numbers.isPowerOfTwo(1));

    t.notOk(math.numbers.isPowerOfTwo(7));

    t.notOk(math.numbers.isPowerOfTwo(-4));

    t.notOk(math.numbers.isPowerOfTwo(undefined));

    t.notOk(math.numbers.isPowerOfTwo(null));
});

grape('For natural numbers', function(t) {
    t.plan(8);

    t.ok(math.numbers.isNatural(0));

    t.ok(math.numbers.isNatural(1));

    t.ok(math.numbers.isNatural(100000000000000));

    t.notOk(math.numbers.isNatural(5.5));

    t.notOk(math.numbers.isNatural(-10));

    t.notOk(math.numbers.isNatural(Infinity));

    t.notOk(math.numbers.isNatural(NaN));

    t.notOk(math.numbers.isNatural(-Infinity));
});

grape('Finding the greatest common divisor', function(t) {
    t.plan(4);

    t.equal(math.numbers.greatestCommonDivisor(10, 20), 10);
    t.equal(math.numbers.greatestCommonDivisor(768, 4096), 256);
    t.equal(math.numbers.greatestCommonDivisor(-6, 30), 6);
    t.equal(math.numbers.greatestCommonDivisor(108, 21), 3);

});