#
# About page requires different enough functionality from page app
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Markdown pages
app.get '/about/page/press', routes.page('press-list')
app.get '/about/page/events', routes.page('events')

app.get '/about', routes.index
app.get /^\/about((?!\/edit).)*$/, routes.index # Scroll routes
app.post '/about/sms', routes.sendSMS

# Safely init upload routes for missing S3 env vars (like in test)
try
  routes.initClient()
  app.all '/about*', routes.adminOnly
  app.get '/about/edit', routes.edit
  app.post '/about/edit', routes.upload
app.use express.static __dirname + '/public'
