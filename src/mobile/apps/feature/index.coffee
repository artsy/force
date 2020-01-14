#
# The feature page (e.g. Whitney Sale or Venice Bienale)
#

express = require 'express'
routes = require './routes'
accounting = require 'accounting'

app = module.exports = express()
app.locals.accounting = accounting

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/feature/:id', routes.index
app.get '/feature/:id/:queryParams', routes.index