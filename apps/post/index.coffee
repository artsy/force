#
# /post/:id
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/post', routes.post
app.get '/post/:id', routes.index
app.get '/post/:id/*', routes.index
