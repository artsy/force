/**
    ## Vector addition - add two vectors expressed in polar notation ##

    add(vectorA - a polar vector, vectorB - another polar vector)

    returns {magnitude, direction expressed as an angle in radians}

    Real world example:

     - (2D) Adding two vectors to produce a third vector that describes the total magnitude and direction.

     - Can be used to apply two forces on one object to get a combined vector
 
        // returns a new vector that is the addition of the two passed vectors
        add(vector1, vector2);

*/

var fromComponents = require('./fromComponents'),
    toComponents = require('./toComponents');

module.exports = function(vectorA, vectorB) {
    var componentsA = toComponents(vectorA.magnitude, vectorA.direction),
        componentB = toComponents(vectorB.magnitude, vectorB.direction);

    return fromComponents(componentsA.x + componentsB.x, componentsA.y + componentsB.y);
};
