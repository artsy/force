express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/sale/:id', routes.index, routes.redirect
app.get '/sale/:id/confirm-registration', routes.index

app.get '/auction/:id', routes.index, routes.redirect
app.get '/auction/:id/confirm-registration', routes.redirectLive, routes.index
app.post '/auction/:id/form', routes.inviteForm
