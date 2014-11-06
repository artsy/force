express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/partner-application', routes.partnerApplication
app.get '/partner-application/success', routes.partnerApplicationSuccess

app.get '/fair-application', routes.fairApplication
app.get '/fair-application/success', routes.fairApplicationSuccess
