request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
gravity = express()
gravity.get '/api/v1/me', (req, res) -> res.send { name: 'Craig' }
gravity.get '/userdontknowwhatitis', (req, res) -> res.send 404
startServer = (callback) ->
  envVars =
    ARTSY_URL: "http://localhost:5001"
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

  it 'proxies certain requests to Gravity if they are supported', (done) ->
    request.get('http://localhost:5000/api/v1/me').end (res) ->
      res.body.name.should.equal 'Craig'
      done()