/**
 ## Vector from Components ##

    fromComponents(x, y)

 returns {magnitude, direction expressed as an angle in radians}

 Real world example:

 - (2D) Convert vector components into their vector form

 */

module.exports = function(x, y) {
    var squared = Math.pow(x, 2) + Math.pow(y, 2),
        ratio = y / x;

    return {
        magnitude: Math.sqrt(squared),
        direction: Math.atan(ratio)
    };
};
