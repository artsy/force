/**
    Vector tests
*/

var grape = require('grape'),
    math = require('../../'),
    helpers = require('../helpers');

grape('Vector component deconstruction', function(t){
    t.plan(2);

    var thirtyDegrees = math.constants.pi / 6;
    var actual = math.vectors.toComponents(2,  thirtyDegrees);

    t.closeTo(actual.x, Math.sqrt(3));
    t.closeTo(actual.y, 1.0);
});

grape('Vector construction from components', function(t){
    t.plan(2);

    var thirtyDegrees = math.constants.pi / 6;

    var actual = math.vectors.fromComponents(Math.sqrt(3), 1.0);

    t.closeTo(actual.magnitude, 2);
    t.closeTo(actual.direction, thirtyDegrees);
});


grape('Vector addition', function(t){
    t.plan(2);

    var degrees45 = math.constants.pi / 4,
        vectorA = math.vectors.fromComponents(10, 20),
        vectorB = math.vectors.fromComponents(20,10);

    var actual = math.vectors.addition(vectorA, vectorB);

    t.closeTo(actual.magnitude, 42.426);
    t.closeTo(actual.direction, degrees45);
});


grape('Vector scaling', function(t){
    t.plan(2);

    var degrees30= math.constants.pi / 6,
        vectorA = math.vectors.fromComponents(Math.sqrt(3), 1);

    var actual = math.vectors.scale(vectorA, 15);

    t.closeTo(actual.magnitude, 2 * 15);
    t.closeTo(actual.direction, degrees30);
});