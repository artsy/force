'use strict';

var net = require('net');
var test = require('tap').test;
if (!process.addAsyncListener) require('../index.js');

var PORT = 12346;

test("another connection handler disconnects server", function (t) {
    t.plan(3);

    // This tests that we don't crash when another connection listener
    // destroys the socket handle before we try to wrap
    // socket._handle.onread .
    // In this case, the connection handler declared below will run first,
    // because the wrapping event handler doesn't get added until
    // the server listens below.

    var server = net.createServer(function() {});
    server.on(
        'connection',
        function (socket) {
            socket.destroy();
            t.ok(! socket._handle, 'Destroy removed the socket handle');
        }
    );

    server.on(
        'listening',
        function () {
            t.ok('Server listened ok');

            // This will run both 'connection' handlers, with the one above
            // running first.
            // This should succeed even though the socket is destroyed.
            var client = net.connect(PORT);
            client.on(
                'connect',
                function () {
                    t.ok(true, 'connected ok');
                    client.destroy();
                    server.close();
                }
            );
        }
    );

    // Another 'connection' handler is registered during this call.
    server.listen(PORT);

});

