express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'

app = module.exports = express()

page = new JSONPage
  name: 'gallery-partnerships2',
  paths:
    show: '/gallery-partnerships'
    edit: '/gallery-partnerships/edit'

app.get page.paths.show, routes.index
app.get page.paths.show + '/data', routes.index
app.get page.paths.edit, adminOnly, routes.index
app.post page.paths.edit, adminOnly, routes.index
