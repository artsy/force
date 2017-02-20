#
# Integration test helper that makes it easy to write fast integration tests.
# One of the ways it does this is by providing the methods `startServer` and
# `closeServer` that will spawn a child process of this project. This means
# a version of this project server will run on localhost:5000 using a fake
# API server exposed below as `api`.
#
_ = require 'underscore'
spawn = require("child_process").spawn
express = require "express"
Browser = require 'zombie'
CurrentUser = require '../../models/current_user'

# Global Zombie options
Browser.debug = true

# Pass in a "test-loggedin" query param or header to stub a logged in a user
@loginMiddleware = (req, res, next) ->
  console.log 'MOOO'
  if req.get('test-loggedin') or req.query['test-loggedin']
    req.user = new CurrentUser fabricate 'user'
    res.locals.sd.CURRENT_USER = req.user.toJSON()
    console.log 'ADDED'
  next()

# Spawns a child process with test variables
@setup = (callback) =>
  return callback?() if @child?
  @child = spawn "node_modules/.bin/coffee", ["mobile/index.coffee"],
    customFds: [0, 1, 2]
    stdio: ["ipc"]
    env: _.extend process.env,
      NODE_ENV: 'test'
      ARTSY_URL: 'http://localhost:5000/__gravity'
      API_URL: 'http://localhost:5000/__gravity'
      POSITRON_URL: 'http://localhost:5000/__positron'
      PORT: 5000
  @child.on "message", -> callback?()
  @child.stdout.pipe process.stdout
  @child.stderr.pipe process.stdout

# Closes the server child process, used in an `after` hook and on
# `process.exit` in case the test suite is interupted.
@teardown = =>
  @child?.kill()
  @child = null
process.on "exit", @teardown

# Start the test server if run directly
@setup() if module is require.main
