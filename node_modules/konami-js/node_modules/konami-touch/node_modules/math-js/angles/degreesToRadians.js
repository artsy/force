var constants = require('../constants');

module.exports = function(degrees) {
    return (degrees / constants.degreesInACircle) * constants.radiansInACircle;
};