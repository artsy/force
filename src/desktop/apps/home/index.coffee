#
# The home page
#

express = require 'express'
routes = require './routes'
markdown = require '../../components/util/markdown'
{ resize } = require '../../components/resizer'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.markdown = markdown
app.get '/', routes.index
app.get '/log_in', routes.redirectLoggedInHome, routes.index
app.get '/sign_up', routes.redirectLoggedInHome, routes.index
# TODO: Remove after /auth2 launches
if !sd.NEW_AUTH_MODAL
  app.get '/forgot', routes.index
