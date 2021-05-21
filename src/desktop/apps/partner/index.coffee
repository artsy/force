express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# app.get '/:id', routes.requirePartner, routes.overview
# app.get '/:id/overview', routes.requirePartner, routes.overview
# app.get '/:id/contact', routes.requirePartner, routes.contact
# app.get '/:id/about', routes.requirePartner, routes.about
# app.get '/:id/collection', routes.requirePartner, routes.collection
# app.get '/:id/shop', routes.requirePartner, routes.shop
# app.get '/:id/works', routes.requirePartner, routes.works
# app.get '/:id/shows', routes.requirePartner, routes.shows
# app.get '/:id/artists', routes.requirePartner, routes.artists
# app.get '/:id/artist/:artistId', routes.requirePartner, routes.artist
# app.get '/:id/articles', routes.requirePartner, routes.articles
app.get '/:id/article/:articleId', routes.requirePartner, routes.articles
