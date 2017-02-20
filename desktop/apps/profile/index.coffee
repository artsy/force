#
# Sets a res.locals.profile to be used by other apps.
# Also handles the /:id/follow route to follow a user or partner profile.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/:id', routes.setProfile
app.get '/:id/:tab*', routes.setProfile
app.get '/:id/follow', routes.follow
app.get '/editorial', routes.redirectEditorial
