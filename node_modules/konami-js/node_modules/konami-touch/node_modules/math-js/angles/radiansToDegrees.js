var constants = require('../constants');

module.exports = function(radians) {
    return (radians / constants.radiansInACircle) * constants.degreesInACircle;
};