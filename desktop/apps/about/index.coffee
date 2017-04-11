express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

page = new JSONPage name: 'about', paths: show: '/about', edit: '/about/edit'
{ data, edit, upload } = require('../../components/json_page/routes')(page)

app.get page.paths.show, routes.index
app.get /^\/about((?!\/edit).)*$/, routes.index # Scroll routes
app.post '/about/sms', routes.sendSMS
app.get page.paths.show + '/data', data
app.get page.paths.edit, adminOnly, edit
app.post page.paths.edit, adminOnly, upload
