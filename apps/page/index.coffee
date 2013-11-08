# 
# Pages like Terms of Use, Privacy, about, etc. that display relatively static content.
# 


express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.get '/terms', routes.vanityUrl('terms')