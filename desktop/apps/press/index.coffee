express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'
JSONPageRoutes = require '../../components/json_page/routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

pageFactory = (name) ->
  page: page = new JSONPage name: name, paths: show: "/press/#{name}", edit: "/press/#{name}/edit"
  routes: JSONPageRoutes(page)

pressReleases = pageFactory 'press-releases'
app.get pressReleases.page.paths.show, routes.pressReleases
app.get pressReleases.page.paths.show + '/data', pressReleases.routes.data
app.get pressReleases.page.paths.edit, adminOnly, pressReleases.routes.edit
app.post pressReleases.page.paths.edit, adminOnly, pressReleases.routes.upload

inTheMedia = pageFactory 'in-the-media'
app.get inTheMedia.page.paths.show, routes.inTheMedia
app.get inTheMedia.page.paths.show + '/data', inTheMedia.routes.data
app.get inTheMedia.page.paths.edit, adminOnly, inTheMedia.routes.edit
app.post inTheMedia.page.paths.edit, adminOnly, inTheMedia.routes.upload
