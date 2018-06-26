#
# Partner profile pages e.g. artsy.net/gagosian-gallery
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:profileId', routes.requirePartner, routes.index
app.get '/:profileId/overview', routes.requirePartner, routes.index
app.get '/:profileId/artists', routes.requirePartner, routes.artists
app.get '/:profileId/artist/:artistId', routes.requirePartner, routes.artist
app.get '/:profileId/collection', routes.requirePartner, routes.fetchArtworksAndRender('Works')
app.get '/:profileId/contact', routes.requirePartner, routes.contact
app.get '/:profileId/articles', routes.requirePartner, routes.articles
app.get '/:profileId/article/:articleId', routes.requirePartner, routes.article
app.get '/:profileId/shop', routes.requirePartner, routes.fetchArtworksAndRender('Shop')
app.get '/:profileId/shows', routes.requirePartner, routes.shows
