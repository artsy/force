request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
gravity = express()
gravity.get '/foobarbaz', (req, res) -> res.send 'Foobar page!'
gravity.get '/api/v1/page/:id', (req, res) -> res.send { content: 'foobar' }
startServer = (callback) ->
  envVars =
    API_URL: "http://localhost:5001"
    APP_URL: "http://localhost:5000"
    PORT: 5000
  envVars[k] = val for k, val of process.env when not envVars[k]?
  child = spawn "make", ["s"],
    customFds: [0, 1, 2]
    stdio: ["ipc"]
    env: envVars
  child.on "message", callback

closeServer = => child.kill()

describe 'Setup', ->

  before (done) ->
    @server = gravity.listen 5001, -> startServer -> done()

  after ->
    @server.close()
    closeServer()

  it 'returns an ok status when /system/up pinged', (done) ->
    request.get('http://localhost:5000/system/up').end (res) ->
      JSON.parse(res.text).nodejs.should.be.ok
      done()
