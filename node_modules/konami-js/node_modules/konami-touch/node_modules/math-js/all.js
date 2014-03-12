module.exports = {
    constants: require('./constants'),
    vectors: {
        toComponents: require('./vectors/toComponents'),
        fromComponents: require('./vectors/fromComponents'),
        add: require('./vectors/add'),
        scale: require('./vectors/scale')
    },
    angles: {
        degreesToRadians: require('./angles/degreesToRadians'),
        radiansToDegrees: require('./angles/radiansToDegrees')
    },
    numbers: {
        isPowerOfTwo: require('./numbers/isPowerOfTwo'),
        isNatural: require('./numbers/isNatural'),
        greatestCommonDivisor: require('./numbers/greatestCommonDivisor')
    }
};