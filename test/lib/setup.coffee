request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
gravity = express()
gravity.get '/', (req, res) -> res.send 'Homepage!'
startServer = (callback) ->
  envVars =
    GRAVITY_URL: "http://localhost:1234"
    PORT: 3456
  envVars[k] = val for k, val of process.env when not envVars[k]?
  child = spawn "make", ["s"],
    customFds: [0, 1, 2]
    stdio: ["ipc"]
    env: envVars
  child.on "message", callback
  child.stdout.on "data", (data) -> console.log data.toString()
closeServer = =>
  child?.kill()
  child = null

describe 'Setup', ->

  before (done) ->
    @server = gravity.listen 1234, -> startServer -> done()

  after ->
    @server.close()
    closeServer()

  it 'proxies unhandled requests to Gravity', (done) ->
    request.get('http://localhost:3456').end (res) ->
      res.text.should.equal 'Homepage!'
      done()