express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'pug'

app.get '/art-fairs', timeout('25s'), routes.index
