var binary = require('node-pre-gyp');
var path = require('path');
var binding_path = binary.find(path.resolve(path.join(__dirname,'./package.json')));
var binding = require(binding_path);
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

inherits(V8Debug, EventEmitter);
function V8Debug() {
  this._processor = this.runInDebugContext('DebugCommandProcessor').prototype;

  this._oldProcessDebugRequest = this._processor.processDebugRequest;

  this._processor.extendedProcessDebugJSONRequestHandles_ = {
    'disconnect': function(request, response) {
      var Module = require('module').Module;
      var moduleKey = module.id.replace(/\\\\|\/\//g, '$1');

      this._processor.processDebugRequest = this._oldProcessDebugRequest;
      delete this._oldProcessDebugRequest;
      delete this._processor.extendedProcessDebugJSONRequest_;
      delete this._processor.extendedProcessDebugJSONRequestHandles_;
      delete Module._cache[moduleKey];

      this._processor.disconnectRequest_(request, response);
      delete this._processor;

      this.emit('close');
    }.bind(this)
  };

  this._processor.extendedProcessDebugJSONRequestAsyncHandles_ = {};

  this._processor.extendedProcessDebugJSONRequest_ = function(json_request) {
    var request;  // Current request.
    var response;  // Generated response.
    try {
      try {
        // Convert the JSON string to an object.
        request = JSON.parse(json_request);

        var handle = this.extendedProcessDebugJSONRequestHandles_[request.command];
        var asyncHandle = this.extendedProcessDebugJSONRequestAsyncHandles_[request.command];
        var asyncResponse;

        if (!handle && !asyncHandle) return;

        // Create an initial response.
        response = this.createResponse(request);

        if (request.arguments) {
          var args = request.arguments;
          if (args.maxStringLength !== undefined) {
            response.setOption('maxStringLength', args.maxStringLength);
          }
          if (args.asyncResponse) {
            asyncResponse = args.asyncResponse;
          }
        }

        if (asyncHandle) {
          if (asyncResponse) return JSON.stringify(asyncResponse);

          asyncHandle.call(this, request, response, function(error) {
            execCommand(request.command, {
              asyncResponse: error || response
            });
          }.bind(this));

          return '{"seq":0,"type":"response","success":true}';
        }

        handle.call(this, request, response);
      } catch (e) {
        // If there is no response object created one (without command).
        if (!response) {
          response = this.createResponse();
        }
        response.success = false;
        response.message = e.toString();
      }

      // Return the response as a JSON encoded string.
      try {
        if (response.running !== undefined) {
          // Response controls running state.
          this.running_ = response.running;
        }
        response.running = this.running_;
        return JSON.stringify(response);
      } catch (e) {
        // Failed to generate response - return generic error.
        return '{"seq":' + response.seq + ',' +
                '"request_seq":' + request.seq + ',' +
                '"type":"response",' +
                '"success":false,' +
                '"message":"Internal error: ' + e.toString() + '"}';
      }
    } catch (e) {
      // Failed in one of the catch blocks above - most generic error.
      return '{"seq":0,"type":"response","success":false,"message":"Internal error"}';
    }
  };

  this._processor.processDebugRequest = function WRAPPED_BY_NODE_INSPECTOR(request) {
    return this.extendedProcessDebugJSONRequest_(request)
      || this.processDebugJSONRequest(request);
  };
}

V8Debug.prototype.register =
V8Debug.prototype.registerCommand = function(name, func) {
  this._processor.extendedProcessDebugJSONRequestHandles_[name] = func;
};

V8Debug.prototype.registerAsync =
V8Debug.prototype.registerAsyncCommand = function(name, func) {
  this._processor.extendedProcessDebugJSONRequestAsyncHandles_[name] = func;
};

V8Debug.prototype.command =
V8Debug.prototype.execCommand =
V8Debug.prototype.emitEvent = execCommand;
function execCommand(name, attributes, userdata) {
  var message = {
    seq: 1,
    type: 'request',
    command: name,
    arguments: attributes || {}
  };
  binding.signal(JSON.stringify(message));
};

V8Debug.prototype.commandToEvent = function(request, response) {
  response.type = 'event';
  response.event = response.command;
  response.body = request.arguments || {};
  delete response.command;
  delete response.request_seq;
};

V8Debug.prototype.registerEvent = function(name) {
  this._processor.extendedProcessDebugJSONRequestHandles_[name] = this.commandToEvent;
};

V8Debug.prototype.get =
V8Debug.prototype.runInDebugContext = function(script) {
  if (typeof script == 'function') script = script.toString() + '()';

  script = /\);$/.test(script) ? script : '(' + script + ');';

  return binding.runScript(script);
};

module.exports = new V8Debug();
