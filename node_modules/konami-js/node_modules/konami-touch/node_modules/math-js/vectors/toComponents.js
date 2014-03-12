/**
    ## Vector to Components ##

        toComponents(magnitude, direction expressed as an angle in radians)

    returns {x, y}

    Real world example:

    - (2D) convert an angle and a distance into a difference in x,y

*/

module.exports = function(magnitude, direction) {
    return {
      x: Math.cos(direction) * magnitude,
      y: Math.sin(direction) * magnitude
    };
};
