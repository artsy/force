#
# The Shortcut redirects
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.get '/:short', routes.index
# Handle shortcuts with additional params like: /vip-preview-the-armory-show-2014/browse/artist/matthias-meyer
app.get '/:short/browse/*', routes.index
# Handle shortcuts with additional params like: /vip-preview-the-armory-show-2014/info
app.get '/:short/info', routes.index
