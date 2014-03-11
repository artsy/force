#
# /browse
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/browse2', routes.index
app.get '/browse/categories', routes.categories