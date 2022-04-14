express = require 'express'
routes = require './routes'
{ adminOnly } = require '../../lib/admin_only'
JSONPage = require '../../components/json_page'
jsonPageRoutes = require '../../components/json_page/routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# JSON Page routes
for subject in ['institution']
  page = new JSONPage
    name: "#{subject}-partnerships"
    paths:
      show: "/#{subject}-partnerships"
      edit: "/#{subject}-partnerships/edit"
  { data, edit, upload } = jsonPageRoutes page
  app.use routes.setSubject subject
  app.get page.paths.show, routes.index
  app.get page.paths.edit, adminOnly, edit
  app.post page.paths.edit, adminOnly, upload
  app.get page.paths.show + '/*', routes.index # scroll routes
