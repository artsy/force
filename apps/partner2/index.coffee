express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:id', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.overview
app.get '/:id/overview', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.redirectToOverview
app.get '/:id/shows', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.shows
app.get '/:id/works', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.works
app.get '/:id/collection', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.collection
app.get '/:id/shop', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.shop
app.get '/:id/artists', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.artists
app.get '/:id/artist/:artistId', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.artist
app.get '/:id/articles', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.articles
app.get '/:id/contact', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.contact
app.get '/:id/about', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.about
app.get '/:id/article/:articleId', routes.requireNewLayout, routes.requireAdminIfInstitution, routes.articles
