Debugging
===

1. Place a `debugger` breakpoint in the desired server-side location
2. Run `make ssd` for staging or `make spd` for production
3. Open the node-inspector at [http://localhost:8081/debug?port=5858](http://localhost:8081/debug?port=5858)
4. Trigger the server-side code containing the breakpoint
5. The node-inspector will halt at the breakpoint and provide a debugging console

Note that, apparently, the node-inspector must be opened before the server-side breakpoint is encountered.
