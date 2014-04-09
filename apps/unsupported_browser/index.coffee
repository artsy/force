#
# Unsupported Browser
#
# This app messages users of dated browsers and manages
# the state of that messaging.
#
# See also lib/middleware/unsupported_browser.coffee
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.get '/unsupported-browser', routes.index
app.post '/unsupported-browser', routes.continueAnyway
