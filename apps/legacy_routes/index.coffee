express = require 'express'
app = module.exports = express()
to = require './to'

app.get '/filter/artworks', to '/browse'
app.get '/genes', to '/categories'
app.get '/partner-application', to '/apply'
app.get '/fair-application', to '/apply/fair'
app.get '/fairs', to 'art-fairs'
app.get '/settings', to '/user/edit'
# Temporary: Can remove once 2015 sale is over. Due to an email error.
app.get '/feature/public-art-fund-2014-spring-benefit', to '/feature/public-art-fund-2015-spring-benefit'