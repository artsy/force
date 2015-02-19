#
# Sets a res.locals.profile to be used by other apps.
# Also handles the /:id/follow route to follow a user or partner profile.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

# HACK: Redirect the "auction" profile to the LAMA auction
app.get '/lama', (req, res) ->
  res.redirect '/feature/los-angeles-modern-auctions-march-2015'
app.get '/:id', routes.setProfile
app.get '/:id/:tab*', routes.setProfile
app.get '/:id/follow', routes.follow
