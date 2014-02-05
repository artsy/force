#
# Integration test helper that makes it easy to write fast integration tests.
# One of the ways it does this is by providing the methods `startServer` and
# `closeServer` that will spawn a child process of this project. This means
# a version of this project server will run on localhost:5000 using a fake
# API server exposed below a `api`.
#
spawn = require("child_process").spawn
express = require "express"

# Fake API server currently stubbing responses from GitHub's API.
# You will want to edit this to stub your own API's behavior.
@api = require('antigravity').server

# Spawns a child process with ENV variables that will launch it in "test"
# mode. This includes an API_URL that points to the fake API server mounted
# under /__api.
@startServer = (callback) =>
  return callback() if @child?
  envVars =
    NODE_ENV: "test"
    ARTSY_URL: "http://localhost:5000/__api"
    APP_URL: 'http://localhost:5000'
    PORT: 5000
  envVars[k] = val for k, val of process.env when not envVars[k]?
  @child = spawn "make", ["s"],
    customFds: [0, 1, 2]
    stdio: ["ipc"]
    env: envVars
  @child.on "message", -> callback()
  @child.stdout.on "data", (data) -> console.log data.toString()

# Closes the server child process, used in an `after` hook and on
# `process.exit` in case the test suite is interupted.
@closeServer = =>
  @child?.kill()
  @child = null

process.on "exit", @closeServer

# You can debug your integration app and run this app server by running
# this module directly and opening up localhost:5000.
# e.g. `coffee test/helpers/integration.coffee`
return unless module is require.main
@startServer => @child.stdout.on "data", (data) -> console.log data.toString()
