#
# Search results landing page
#

express = require 'express'
routes = require './routes'
maybeNewSearchPage = require('./maybe_new_search_page.ts')

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/search', maybeNewSearchPage, routes.index
app.get '/search/image/:model/:id', routes.image
