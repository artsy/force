#
# /posts
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/posts', routes.index
app.get '/posts/featured', routes.featured
app.get '/posts/all', routes.all
