#
# The home page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/unsubscribe*', (req, res) => res.redirect(301, "/user/edit")
