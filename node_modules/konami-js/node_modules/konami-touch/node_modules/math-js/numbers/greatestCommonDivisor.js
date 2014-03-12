/**
    ## Greatest common divisor ##

        greatestCommonDivisor(integer1, integer2)

    returns a natural number [wikipedia](http://en.wikipedia.org/wiki/Greatest_common_divisor)

    Real world example:
    
    todo.

*/

module.exports = function greatestCommonDivisor(a, b) {
    if(a < 0){
        a = -a;
    }

    if(b < 0){
      b = -b;  
    }
    
    if(b > a){
        var temp = a;
        a = b;
        b = temp;
    }
    
    while(true){
        a %= b;
        
        if(a == 0){
            return b;
        }
        
        b %= a;
        
        if(b == 0){
            return a;
        }
    }
};
