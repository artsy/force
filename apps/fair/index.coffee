#
# /:id
#

express = require 'express'
routes = require './routes'
fairDataMiddleware = require './lib/fair_data_middleware'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'


app.get '/:id', fairDataMiddleware, routes.overview
app.get '/:id/overview', fairDataMiddleware, routes.overview
app.get '/:id/posts', fairDataMiddleware, routes.fairPosts
app.get '/:id/info', fairDataMiddleware, routes.info
app.get '/:id/for-you', fairDataMiddleware, routes.forYou
app.get '/:id/search', fairDataMiddleware, routes.search
app.get '/:id/browse/show/:partner_id', fairDataMiddleware, routes.showRedirect
app.get '/:id/browse', fairDataMiddleware, routes.browse
app.get '/:id/browse/*', fairDataMiddleware, routes.browse
app.get '/:id/following/:type', fairDataMiddleware, routes.follows
app.get '/:id/favorites', fairDataMiddleware, routes.favorites
# Handle microgravity urls that get crawled by google
app.get '/:id/programming', fairDataMiddleware, routes.overview
