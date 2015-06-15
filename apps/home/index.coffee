#
# The home page
#

express = require 'express'
routes = require './routes'

coinToss = (req, res, next) ->
  if res.locals.sd.HOMEPAGE_CONTENTS is 'featured'
    routes.index req, res, next
  else
    routes.newIndex req, res, next

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/', coinToss
app.get '/log_in', routes.redirectLoggedInHome, routes.index
app.get '/sign_up', routes.redirectLoggedInHome, routes.index
app.get '/forgot', routes.index