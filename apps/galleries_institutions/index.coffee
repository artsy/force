express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/:type', routes.partners
app.get '/:type', routes.partnersSearch

app.get '/:type-a-z', routes.partnersAZ

app.get '/:type/all', routes.partnersSearch
