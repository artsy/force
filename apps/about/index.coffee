express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/middleware/admin_only'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Markdown pages
app.get '/about/page/press', routes.page('press-list')
app.get '/about/page/events', routes.page('events')

app.post '/about/sms', routes.sendSMS

JSONPage = require '../../components/json_page'
page = new JSONPage name: 'about', paths: show: '/about', edit: '/about/edit'
{ data, edit, upload } = require('../../components/json_page/routes')(page)

app.get page.paths.show, routes.index
app.get /^\/about((?!\/edit).)*$/, routes.index # Scroll routes
app.get page.paths.show + '/data', data
app.get page.paths.edit, adminOnly, edit
app.post page.paths.edit, adminOnly, upload
