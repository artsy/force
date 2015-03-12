express = require 'express'
app = module.exports = express()
to = require './to'

app.get '/filter/artworks', to '/browse'
app.get '/genes', to '/categories'
app.get '/partner-application', to '/apply'
app.get '/fair-application', to '/apply/fair'
