request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
gravity = express()
gravity.get '/user/onlysupportedongravity', (req, res) -> res.send 'I can handle it!'
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

  it 'proxies unhandled requests to Gravity if they are supported', (done) ->
    request.get('http://localhost:5000/user/onlysupportedongravity').end (res) ->
      res.text.should.equal 'I can handle it!'
      done()

  it 'passes unsupported routes on Gravity to my own error handler', (done) ->
    request.get('http://localhost:5000/user/dontknowwhatitis').end (res) ->
      res.text.should.include 'The page you were looking for doesn\'t exist.'
      res.statusCode.should.equal 404
      done()
