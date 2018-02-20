#
# The shows listing page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/shows', routes.index
app.get '/shows/:city', routes.city
app.get '/all-cities', routes.all_cities
