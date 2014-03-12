/**
 ## Vector scaling - increase the magnitude of the vector, without affecting the direction##

 scale(vector - a polar vector, scalar - an amount to scale by)

 returns {magnitude, direction expressed as an angle in radians}

 Real world example:

 - (2D) Increasing the force applied to an object, without changing the angle.
 
   // double the magnitude of a vector:
   scale(myVector, 2);

*/

module.exports = function(vector, scalar) {
    return {
        magnitude: vector.magnitude * scalar,
        direction: vector.direction
    };
};
