#
# /partners
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'pug'

app.get '/partners', routes.index
