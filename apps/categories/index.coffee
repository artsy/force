express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/categories', routes.index
app.get '/category', routes.redirectCategory
app.get '/gene', routes.redirectGene  # '/genes' also redirects to '/categories'
