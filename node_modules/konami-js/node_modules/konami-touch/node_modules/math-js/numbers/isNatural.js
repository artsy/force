/**
    ## Is natural ##

        isNatural(anyNumber)

    returns boolean

    Real world example:

    - Test if a number is a member of the set of natural numbers, used for counting 

*/

module.exports = function isNatural(anyNumber) {
    return (anyNumber >= 0.0) 
        && (Math.floor(anyNumber) === anyNumber)
        && anyNumber !== Infinity;
};

