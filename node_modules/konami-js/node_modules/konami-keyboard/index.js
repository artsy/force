var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
    KeyboardCode = require('keyboard-code');

function KonamiKeyboard(success){
    KeyboardCode.call(this, konamiCode, success || function(){});
}

KonamiKeyboard.prototype = Object.create(KeyboardCode.prototype);
KonamiKeyboard.prototype.constructor = KonamiKeyboard;

module.exports = KonamiKeyboard;