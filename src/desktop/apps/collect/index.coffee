express = require 'express'
routes = require './routes'

adminOnly = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/collect', routes.index
# redirect old routes
app.get '/browse', routes.redirectBrowse
app.get '/browse/artworks*', routes.redirectBrowse
app.get '/artwork', routes.redirectBrowse
app.get '/artworks', routes.redirectBrowse

page = new JSONPage name: 'browse-categories', paths: show: '/browse-categories', edit: '/browse-categories/edit'
{ data, edit, upload } = require('../../components/json_page/routes')(page)

app.get page.paths.show, routes.categories
app.get page.paths.show + '/data', data # Optional, just exposes the page's data
app.get page.paths.edit, adminOnly, edit
app.post page.paths.edit, adminOnly, upload



