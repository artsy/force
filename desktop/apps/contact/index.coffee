express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/admin_only'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

JSONPage = require '../../components/json_page'
page = new JSONPage name: 'contact', paths: show: '/contact', edit: '/contact/edit'
{ data, edit, upload } = require('../../components/json_page/routes')(page)

app.get page.paths.show, routes.index
app.get page.paths.show + '/data', data
app.get page.paths.edit, adminOnly, edit
app.post page.paths.edit, adminOnly, upload
