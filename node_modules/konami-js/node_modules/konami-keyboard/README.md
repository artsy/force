#konami-keyboard

Watches for the konami code (↑ ↑ ↓ ↓ ← → ← → B A ENTER) to be input on the keyboard then fires a callback

##Installation

    npm install konami-keyboard


##Usage

    var KonamiKeyboard = require('konami-keyboard');

    new KonamiKeyboard(function(){
        alert('KONAMI!');
    });
