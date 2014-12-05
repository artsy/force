express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/partners', timeout('25s'), routes.partners
app.get '/galleries', timeout('25s'), routes.galleries
app.get '/institutions', timeout('25s'), routes.institutions
