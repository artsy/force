express = require 'express'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Just render the index or pass if it's not a partner.
# Routing is handled client-side.
for route in ['/:id', '/:id/overview', '/:id/contact', '/:id/about', '/:id/collection',
              '/:id/shop', '/:id/shows', '/:id/artists', '/:id/artist/:artistId', '/:id/posts']
  app.get route, (req, res, next) ->
    return next() unless res.locals.profile?.isPartner()
    res.render 'index'