#
# Partner profile pages e.g. artsy.net/gagosian-gallery
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:profileId', routes.index
app.get '/:profileId/overview', routes.index
app.get '/:profileId/artists', routes.artists
app.get '/:profileId/artist/:artistId', routes.artist
app.get '/:profileId/collection', routes.fetchArtworksAndRender('Works')
app.get '/:profileId/contact', routes.contact
app.get '/:profileId/articles', routes.articles
app.get '/:profileId/article/:articleId', routes.article
app.get '/:profileId/shop', routes.fetchArtworksAndRender('Shop')
app.get '/:profileId/shows', routes.shows
