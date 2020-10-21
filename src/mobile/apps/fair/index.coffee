#
# The fairs app. This includes the main page for the two different kinds of fairs (the officially
# partnered fairs, and the "grey swan" fairs we don't officially represent). Other pages include
# A-Z lists of exhibitors and artists, exhibitions booths filtered by various criteria, and
# lists of artworks in exhibitions also filtered by various criteria.
#

express = require 'express'
routes = require './routes'

{ redirectFairRequests } = require('./../../../desktop/apps/fair/fairRedirection.ts')

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/:profileId', redirectFairRequests, routes.requireFair, routes.mainPage
app.get '/:profileId/feed', redirectFairRequests, routes.requireFair, routes.feed  # Instagram feed introduced at The Armory 2015
app.get '/:profileId/live', redirectFairRequests, routes.requireFair, routes.trending  # This changed to "Trending", but routes were in place
app.get '/:profileId/for-you', redirectFairRequests, routes.requireFair, routes.forYou
app.get '/:profileId/overview', redirectFairRequests, routes.requireFair, routes.mainPage
app.get '/:profileId/articles', redirectFairRequests, routes.requireFair, routes.articles
app.get '/:profileId/article/:slug', redirectFairRequests, routes.requireFair, routes.article
app.get '/:profileId/search', redirectFairRequests, routes.requireFair, routes.search
app.get '/:profileId/browse/exhibitors', redirectFairRequests, routes.requireFair, routes.exhibitorsAtoZ
app.get '/:profileId/browse/artists', redirectFairRequests, routes.requireFair, routes.artistsAtoZ
app.get '/:profileId/browse/filter', redirectFairRequests, routes.requireFair, routes.sections
app.get '/:profileId/browse/artist/:artistId', redirectFairRequests, routes.requireFair, routes.artist
app.get '/:profileId/browse/show/:partnerId', redirectFairRequests, routes.requireFair, routes.showRedirect
app.get '/:profileId/browse/booths', redirectFairRequests, routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/booths/section', redirectFairRequests, routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/booths/section/:section', redirectFairRequests, routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/artist/:artistId', redirectFairRequests, routes.requireFair, routes.exhibitors
app.get '/:profileId/browse/artworks', redirectFairRequests, routes.requireFair, routes.artworks
