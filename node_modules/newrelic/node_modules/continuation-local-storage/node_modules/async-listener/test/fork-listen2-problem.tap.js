'use strict';

var fork = require('child_process').fork;
var test = require('tap').test;

test("parent listener", function (t) {
  var server = require('net').createServer();

  this.tearDown(function () {
    server.close();
  });

  server.listen(8585, function () {
    t.ok(server, "parent listening on port 8585");

    var listener = fork(__dirname + '/fork-listener.js');
    t.ok(listener, "child process started");

    listener.on('message', function (message) {
      if (message === 'shutdown') {
        t.ok(message, "child handled error properly");
        listener.send('shutdown');
        t.end();
      }
      else {
        t.fail("parent got unexpected message " + message);
      }
    });
  });
});
