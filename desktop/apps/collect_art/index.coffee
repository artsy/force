express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

landing = new JSONPage
  name: 'collect-art',
  paths:
    show: '/collect-art'
    edit: '/collect-art/edit'

{ data, edit, upload } = require('../../components/json_page/routes')(landing)

app.get landing.paths.show, routes.landing
app.get landing.paths.show + '/data', data
app.get landing.paths.edit, adminOnly, edit
app.post landing.paths.edit, adminOnly, upload
