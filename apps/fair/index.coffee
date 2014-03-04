#
# /:id
#

express     = require 'express'
routes      = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/:id/info', routes.info       # #{fair.name} | Visitor Information | Artsy
app.get '/:id/for-you', routes.forYou  # #{fair.name} | Your Personal Fair Guide | Artsy
app.get '/:id/overview', routes.overview # TODO: put in redirect to home
app.get '/:id/search', routes.search # nope
app.get '/:id/browse/show/:partner_id', routes.showRedirect
app.get '/:id/browse', routes.browse
app.get '/:id/browse/*', routes.browse

# browse/booths - # #{fair.name} | Browse #{exhibitorsCount} Exhibitors | Artsy
# browse/exhibitors - # #{fair.name} | See A-Z List of All Exhibitors | Artsy
# browse/artists - # #{fair.name} | See A-Z List of All Artists | Artsy
# browse/artworks - # #{fair.name} | Browse #{artworksCount} Artworks | Artsy
# browse/section/:id - # #{fair.name} | Exhibitors at #{sectionName} | Artsy

app.get '/:id/following/:type', routes.follows
app.get '/:id/favorites', routes.favorites
