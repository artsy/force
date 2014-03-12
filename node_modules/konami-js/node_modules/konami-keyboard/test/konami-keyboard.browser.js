(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
    KeyboardCode = require('keyboard-code');

function KonamiKeyboard(success){
    KeyboardCode.call(this, konamiCode, success || function(){});
}

KonamiKeyboard.prototype = Object.create(KeyboardCode.prototype);
KonamiKeyboard.prototype.constructor = KonamiKeyboard;

module.exports = KonamiKeyboard;
},{"keyboard-code":2}],2:[function(require,module,exports){
function KeyboardCode(code, success){
    this.code = code || [];
    this.success = success || function(){};
    this.codeIndex = 0;

    if(window.addEventListener) {
        window.addEventListener("keyup", this.checkCode.bind(this), false);
    } else {
        window.attachEvent("onkeyup", this.checkCode.bind(this));
    }
}

KeyboardCode.prototype.checkCode = function checkCode(event){
    if(event.keyCode === this.code[this.codeIndex++]){
        if(this.codeIndex === this.code.length){
            this.success();
            this.codeIndex = 0;
        }
    }else{
        this.codeIndex = 0;
    }
};

module.exports = KeyboardCode;
},{}],3:[function(require,module,exports){
var KonamiKeyboard = require('../');

new KonamiKeyboard(function(){
    alert('KONAMI!');
});

},{"../":1}]},{},[3])