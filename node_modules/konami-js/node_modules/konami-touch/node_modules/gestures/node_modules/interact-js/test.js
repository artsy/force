var interact = require('./');

window.onload = function(){

    var eventHandler = function(interaction){
        console.log(interaction);
    };

    interact.on('move', document.body, eventHandler);
    interact.on('start', document.body, eventHandler);
    interact.on('drag', document.body, eventHandler);
    interact.on('end', document.body, eventHandler);
    interact.on('cancel', document.body, eventHandler);

    setTimeout(function(){
        interact.removeListener('move', document.body, eventHandler);
    }, 3000);

};