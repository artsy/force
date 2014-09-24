#
# About page requires different enough functionality from page app
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/gallery-partnerships', routes.index
app.get /^\/gallery-partnerships((?!\/edit).)*$/, routes.index # Scroll routes

# Safely init upload routes for missing S3 env vars (like in test)
try
  routes.initClient()
  app.get  '/gallery-partnerships/edit', routes.adminOnly, routes.edit
  app.post '/gallery-partnerships/edit', routes.adminOnly, routes.upload

app.use express.static __dirname + '/public'
