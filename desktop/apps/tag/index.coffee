#
# The tag page at /tag/:id.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/tag/:id', routes.index
app.get '/tag/:id/*', routes.index
