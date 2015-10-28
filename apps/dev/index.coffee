#
# Currently just a blank page for native
# apps to use in preparing network caches
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/dev/blank', routes.blank
