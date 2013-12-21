var sayHi = require('./shared-module').sayHi,
    USER_AGENT = require('../').data.USER_AGENT
    ENV = require('../').data.ENV;

$(function() {
  alert(sayHi() + ', your user agent is: ' + USER_AGENT);
  $('h4').html(JSON.stringify(ENV));
});