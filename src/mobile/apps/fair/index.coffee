#
# The fairs app. This includes the main page for the two different kinds of fairs (the officially
# partnered fairs, and the "grey swan" fairs we don't officially represent). Other pages include
# A-Z lists of exhibitors and artists, exhibitions booths filtered by various criteria, and
# lists of artworks in exhibitions also filtered by various criteria.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/:profileId', routes.requireFair, routes.mainPage
app.get '/:profileId/feed', routes.requireFair, routes.feed  # Instagram feed introduced at The Armory 2015
app.get '/:profileId/live', routes.requireFair, routes.trending  # This changed to "Trending", but routes were in place
app.get '/:profileId/for-you', routes.requireFair, routes.forYou
app.get '/:profileId/overview', routes.requireFair, routes.mainPage
app.get '/:profileId/articles', routes.requireFair, routes.articles
app.get '/:profileId/article/:slug', routes.requireFair, routes.article
app.get '/:profileId/search', routes.requireFair, routes.search
app.get '/:profileId/browse/exhibitors', routes.requireFair, routes.exhibitorsAtoZ
app.get '/:profileId/browse/artists', routes.requireFair, routes.artistsAtoZ
app.get '/:profileId/browse/filter', routes.requireFair, routes.sections
app.get '/:profileId/browse/artist/:artistId', routes.requireFair, routes.artist
app.get '/:profileId/browse/show/:partnerId', routes.requireFair, routes.showRedirect
app.get '/:profileId/browse/booths', routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/booths/section', routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/booths/section/:section', routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/artist/:artistId', routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/artworks', routes.requireFair, routes.artworks
