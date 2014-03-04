#
# /:id
#

express     = require 'express'
routes      = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/:id/info', routes.info
app.get '/:id/for-you', routes.forYou
app.get '/:id/overview', routes.overview
app.get '/:id/search', routes.search
app.get '/:id/browse/show/:partner_id', routes.showRedirect
app.get '/:id/browse', routes.browse
app.get '/:id/browse/*', routes.browse

app.get '/:id/following/:type', routes.follows
app.get '/:id/favorites', routes.favorites
