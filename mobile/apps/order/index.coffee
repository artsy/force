#
# The order page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.get '/order/:id/resume', routes.resume
