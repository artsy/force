#
# Search results landing page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/search', routes.index
app.get '/search/image/:model/:id', routes.image
