express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/middleware/admin_only'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/eoy-2016', adminOnly, routes.eoy