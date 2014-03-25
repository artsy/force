express = require 'express'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Just render the index or pass if it's not a user.
# Routing is handled client-side.
for route in ['/:id', '/:id/favorites', '/:id/posts']
  app.get route, (req, res, next) ->
    return next() unless res.locals.profile?.isUser()
    res.render 'index'