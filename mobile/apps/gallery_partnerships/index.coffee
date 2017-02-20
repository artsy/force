#
# Gallery Partnerships page requires different functionality from others.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/gallery-partnerships', routes.index
app.get /^\/gallery-partnerships\/((?!edit$).)+$/, routes.index

# Randomly redirect this link for a marketing A/B testing
app.get '/partnership-opportunities', routes.mktoABTest
