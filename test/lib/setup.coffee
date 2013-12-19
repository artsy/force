# request = require 'superagent'
# express = require 'express'
# { spawn } = require "child_process"

# child = null
# gravity = express()
# gravity.get '/foobarbaz', (req, res) -> res.send 'Foobar page!'
# gravity.get '/api/v1/page/:id', (req, res) -> res.send { content: 'foobar' }
# startServer = (callback) ->
#   envVars =
#     ARTSY_URL: "http://localhost:1234"
#     ASSET_PATH: "http://cdn.com/"
#     APP_URL: "http://localhost:3456"
#     PORT: 3456
#   envVars[k] = val for k, val of process.env when not envVars[k]?
#   child = spawn "make", ["s"],
#     customFds: [0, 1, 2]
#     stdio: ["ipc"]
#     env: envVars
#   child.on "message", callback
#   child.stdout.on "data", (data) -> console.log data.toString()
# closeServer = =>
#   child.kill()
#   child = null

# describe 'Setup', ->

#   before (done) ->
#     @server = gravity.listen 1234, ->
#       console.log 'Gravity listening'
#       startServer ->
#         console.log 'Server listening'
#         done()

#   after ->
#     @server.close()
#     closeServer()

#   xit 'proxies unhandled requests to Gravity', (done) ->
#     request.get('http://localhost:3456/foobarbaz').end (res) ->
#       res.text.should.equal 'Foobar page!'
#       done()

#   it 'changes the asset path if requested from SSL', (done) ->
#     request.get('http://localhost:3456/terms').set('X-Forwarded-Proto': 'https').end (res) ->
#       res.text.should.include 'https://cdn.com/'
#       done()

#   it 'returns an ok status when /system/up pinged', (done) ->
#     request.get('http://localhost:3456/system/up').end (res) ->
#       JSON.parse(res.text).nodejs.should.be.ok
#       done()
