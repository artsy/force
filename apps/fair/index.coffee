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
app.get '/:id/browse', routes.browse
