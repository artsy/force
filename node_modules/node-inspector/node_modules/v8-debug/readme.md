[![Build Status](https://secure.travis-ci.org/node-inspector/v8-debug.png?branch=master)](http://travis-ci.org/node-inspector/v8-debug)

# v8-debug
Provides extending API for [node](http://github.com/ry/node) internal debugger protocol (based on [v8 debugger protocol](https://code.google.com/p/v8/wiki/DebuggerProtocol))

This is a part of [node-inspector](http://github.com/node-inspector/node-inspector).

## Installation

    npm install v8-debug

## API

| Command | Params | Type | Description |
| :---: | :---: | :---: | :--- |
|registerCommand|||*Register new debug processor command, like 'lookup'.* (Alias `register`)|
||name|**{String}**| *Name of command.*|
||callback|**{Function}**|*function(request, response) modify your response in this function.*|
|registerEvent|||*Register new debug processor event, like 'break'.*|
||name|**{String}**| *Name of command.*|
|execCommand|||*Call debug processor command like 'lookup'.* (Alias `command`)|
||name|**{String}**| *Name of command.*|
||attributes|**{Object}**| *Extra parameters, that passes as command arguments.*|
||userdata|**{Object}**| *Data than needs to be stored, but can't be serialised before call processor callback.* (Not implemented now)|
|emitEvent|||*Like `execCommand`*|
|commandToEvent|||*Convert command response object to default event object with same name*|
||request|**{Object}**|*Request object created by debugger*|
||response|**{Object}**|*Response object that needs to be converted*|
|runInDebugContext|||*Evaluate string or function (stringifyed) in debug context.* (Alias `get`)|
||script|**{String/Function}**|*String or _clear_ function that needs to be evaluated in debug context *|

## Usage

```js
var debug = require('v8-debug');
var MakeMirror = debug.get('MakeMirror');

//register 'console' event in v8 debugger protocol
debug.registerEvent('console');
//Now debugger can emit new event 'console'

//register '_lookup' command in v8 debugger protocol
debug.registerCommand('_lookup', function(request, response) {
  //do someting here
  //and modify response
  response.body = {};
});

console.log = (function(fn) {
  return function() {
    //Call 'console' command. (Emit console event)
    debug.emitEvent('console', {message: arguments[0]} /*, userdata*/);
    return fn.apply(console, arguments);
  }
} (console.log));
```
For more experience see [protocol documentation](https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md)
