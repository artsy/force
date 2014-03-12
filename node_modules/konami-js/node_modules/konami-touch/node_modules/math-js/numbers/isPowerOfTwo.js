/**
    ## Is power of Two ##

        isPowerOfTwo(naturalNumber as an integer)

    returns boolean

    Real world example:

    - Test if a series of bits needs padding.

    - Efficiently test the output of a function that should only return values that are powers of two (say for memory sizes)

*/

module.exports = function isPowerOfTwo(naturalNumber) {
    // Bitwise AND (&) compares the bits of two numbers.
    // Powers of two always have only one bit set.
    // Subtracting one forces all lower order bits to get flipped.
    // Then the AND (&) ensures no other bits match between the two values,
    // thus proving only one bit was ever flipped.

    return naturalNumber && (naturalNumber & (naturalNumber - 1)) === 0;
};

