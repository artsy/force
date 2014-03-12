#keyboard-code

Watches for a defined set of keyboard inputs then fires a callback


##Installation

    npm install keyboard-code


##Usage

    var KeyboardCode = require('keyboard-code');

    new KeyboardCode([13, 13, 13], function(){
        alert('Enter 3 times!');
    });
