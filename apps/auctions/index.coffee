express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/auctions', routes.index
app.get '/auctions/reminders', routes.reminders
app.get '/auction', routes.redirectAuction
