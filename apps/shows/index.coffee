#
# /shows
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/shows', routes.index
app.get '/shows/:city', routes.city
app.get '/show', routes.redirectShow

# Redirect pre-2015 location routes
redirects = 
  'beijing': 'beijing-china'
  'berlin': 'berlin-germany'
  'boston': 'boston-ma-usa'
  'chicago': 'chicago-il-usa'
  'hong-kong': 'hong-kong-hong-kong'
  'london': 'london-united-kingdom'
  'los-angeles': 'los-angeles-ca-usa'
  'miami': 'miami-fl-usa'
  'milan': 'milan-italy'
  'new-york': 'new-york-ny-usa'
  'paris': 'paris-france'
  'san-francisco': 'san-francisco-ca-usa'
  'santa-fe': 'santa-fe-nm-usa'
  'sao-paulo': 'sao-paulo-brazil'
  'shanghai': 'shanghai-china'
  'tokyo': 'tokyo-japan'
  'toronto': 'toronto-canada'

for oldSlug, newSlug of redirects
  app.get "/#{oldSlug}", ((slug) -> (req, res) ->
    res.redirect 301, "/shows/#{slug}"
  )(newSlug)
