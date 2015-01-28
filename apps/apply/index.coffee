express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/apply', routes.index
app.get '/apply/*', routes.index
app.post '/apply/form', routes.form

# Legacy routes
app.get '/partner-application', (req, res) -> res.redirect '/apply'
app.get '/fair-application', (req, res) -> res.redirect '/apply/fair'
