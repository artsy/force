express = require 'express'
app = module.exports = express()
to = require './to'

app.get '/filter/artworks', to '/browse'
app.get '/filter/artworks/*', to '/browse'
app.get '/genes', to '/categories'
app.get '/partner-application', to '/apply'
app.get '/fair-application', to '/apply/fair'
app.get '/fairs', to 'art-fairs'
app.get '/feature/art-fairs', to 'art-fairs'
app.get '/settings', to '/user/edit'
# Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
app.get '/_=_', to '/'
app.get '/press', to '/about/page/press'
