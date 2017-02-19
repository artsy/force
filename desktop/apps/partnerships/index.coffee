#
# Gallery Partnerships page requires different functionality from others.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Safely init upload routes for missing S3 env vars (like in test)
try
  routes.initClient()
  app.get  '/:subject(auction|institution|gallery)-partnerships/edit', routes.adminOnly, routes.edit
  app.post '/:subject(auction|institution|gallery)-partnerships/edit', routes.adminOnly, routes.upload

app.get '/:subject(auction|institution|gallery)-partnerships', routes.index
app.get '/:subject(auction|institution|gallery)-partnerships/*', routes.index # scroll routes

# Randomly redirect this link for a marketing A/B testing
app.get '/partnership-opportunities', routes.mktoABTest
