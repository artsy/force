request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
gravity = express()
gravity.get '/api/v1/me', (req, res) ->
  res.send { name: 'Craig' }
gravity.get '/userdontknowwhatitis', (req, res) ->
  res.send 404
gravity.get '/post', (req, res) ->
  res.send { token: req.get('x-access-token') }
startServer = (callback) ->
  envVars =
    NODE_ENV: 'test'
    API_URL: "http://localhost:5001"
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

xdescribe 'Setup', ->

  before (done) ->
    @server = gravity.listen 5001, -> startServer -> done()

  after ->
    @server.close()
    closeServer()

  it 'proxies certain requests to Gravity if they are supported', (done) ->
    request.get('http://localhost:5000/api/v1/me').end (err, res) ->
      res.body.name.should.equal 'Craig'
      done()
