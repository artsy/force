express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/galleries', routes.galleries
app.get '/institutions', routes.institutions

app.get '/gallery-a-z', routes.galleriesAZ
app.get '/institution-a-z', routes.institutionsAZ
