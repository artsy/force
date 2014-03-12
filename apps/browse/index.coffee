#
# /browse
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/browse', routes.index
app.get '/browse*', routes.index
app.get '/categories', routes.categories
app.get '/genes', routes.redirectToCategories
