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
app.get '/_=_', to '/' # Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
app.get '/press', to '/press/press-releases'
app.get '/about/press', to '/press/press-releases'
app.get '/about/page/press', to '/press/press-releases'
app.get '/about/page/events', to '/press/in-the-media'
app.get '/about/jobs', to '/jobs'
app.get '/lama', to '/auction/los-angeles-modern-auctions-march-2015' # HACK: Redirect the "auction" profile to the LAMA auction
app.get '/home/featured_works', to '/tag/apple/artworks'
app.get '/home/featured%20works', to '/tag/apple/artworks'
