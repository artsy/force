# 
# Main app file that runs setup code and starts the server process.
# This code should be kept to a minimum. Any setup code that gets large should 
# be abstracted into modules under /lib.
# 

{ PORT } = require "./config"
express = require "express"
setup = require "./lib/setup"

app = module.exports = express()
setup app

# Start the server and send a message to IPC for the integration test 
# helper to hook into.
app.listen PORT, ->
  console.log "Listening on port " + PORT
  process.send? "listening"