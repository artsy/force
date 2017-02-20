#
# Integration test helper that makes it easy to write fast integration tests.
# One of the ways it does this is by providing the methods `startServer` and
# `closeServer` that will spawn a child process of this project. This means
# a version of this project server will run on localhost:5000 using a fake
# API server exposed below a `api`.
#
_ = require 'underscore'
spawn = require("child_process").spawn
express = require "express"
Browser = require 'zombie'
request = require 'superagent'

# Global Zombie options
Browser.debug = true

# Spawns a child process with test .env.test variables
@startServer = (callback) =>
  request.get('http://localhost:5000/__gravity/api/v1/artwork/andy-warhol-skull').end (err, res) =>
    return callback?() if res?.body?.title
    @child = spawn "node_modules/.bin/coffee", ["index.coffee"],
      customFds: [0, 1, 2]
      stdio: ["ipc"]
      env:
        PATH: process.env.PATH
        NODE_ENV: 'test'
        APP_URL: 'http://localhost:5000'
        ARTSY_URL: 'http://localhost:5000/__gravity'
        API_URL: 'http://localhost:5000/__gravity'
        PORT: 5000
    @child.on "message", -> callback?()
    @child.stdout.pipe process.stdout
    @child.stderr.pipe process.stdout
  return

# Closes the server child process, used in an `after` hook and on
# `process.exit` in case the test suite is interupted.
@closeServer = =>
  @child?.kill()
  @child = null
process.on "exit", @closeServer

# Start the test server if run directly
@startServer() if module is require.main
