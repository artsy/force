express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/user/refresh', routes.refresh

app.get '/profile/edit', routes.settings
app.get '/user/edit', routes.settings
app.get '/user/delete', routes.settings
app.get '/user/saves', routes.settings

adminOnly = require '../../lib/middleware/admin_only'

app.get '/user/auctions', adminOnly, routes.settings
app.get '/user/payments', adminOnly, routes.settings
