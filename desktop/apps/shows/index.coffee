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
oldRedirects =
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

for oldSlug, newSlug of oldRedirects
  app.get "/#{oldSlug}", ((slug) -> (req, res) ->
    res.redirect 301, "/shows/#{slug}"
  )(newSlug)

# Redirect artsy/places location routes
placesRedirects =
  'amsterdam': 'amsterdam-netherlands'
  'aspen': 'aspen-co-usa'
  'athens': 'athens-greece'
  'atlanta': 'atlanta-ga-usa'
  'baku': 'baku-azerbaijan'
  'baltimore': 'baltimore-md-usa'
  'bangkok': 'bangkok-thailand'
  'barcelona': 'barcelona-spain'
  'basel': 'basel-switzerland'
  'beijing': 'beijing-china'
  'beirut': 'beirut-lebanon'
  'berlin': 'berlin-germany'
  'boston': 'boston-ma-usa'
  'brussels': 'brussels-belgium'
  'buenos-aires': 'buenos-aires-argentina'
  'cape-town': 'cape-town-south-africa'
  'chicago': 'chicago-il-usa'
  'cologne': 'cologne-germany'
  'copenhagen': 'copenhagen-denmark'
  'daegu': 'daegu-south-korea'
  'dallas': 'dallas-tx-usa'
  'denver': 'denver-co-usa'
  'dubai': 'dubai-united-arab-emirates'
  'dublin': 'dublin-ireland'
  'dusseldorf': 'dusseldorf-germany'
  'east-hampton': 'east-hampton-ny-usa'
  'florence': 'florence-italy'
  'frankfurt': 'frankfurt-germany'
  'geneva': 'geneva-switzerland'
  'hamburg': 'hamburg-germany'
  'helsinki': 'helsinki-finland'
  'hong-kong': 'hong-kong-hong-kong'
  'houston': 'houston-tx-usa'
  'istanbul': 'istanbul-turkey'
  'jerusalem': 'jerusalem-israel'
  'johannesburg': 'johannesburg-south-africa'
  'kuala-lumpur': 'kuala-lumpur-malaysia'
  'leipzig': 'leipzig-germany'
  'lisbon': 'lisbon-portugal'
  'london': 'london-united-kingdom'
  'los-angeles': 'los-angeles-ca-usa'
  'madrid': 'madrid-spain'
  'makati-city': 'makati-philippines'
  'melbourne': 'melbourne-australia'
  'mexico-city': 'mexico-city-mexico'
  'miami': 'miami-fl-usa'
  'milan': 'milan-italy'
  'montevideo': 'montevideo-uruguay'
  'montreal': 'montreal-canada'
  'moscow': 'moscow-russia'
  'mumbai': 'mumbai-india'
  'munich': 'munich-germany'
  'naples': 'naples-fl-usa'
  'napoli': 'naples-italy'
  'new-delhi': 'new-delhi-india'
  'new-york': 'new-york-ny-usa'
  'oslo': 'oslo-norway'
  'palm-beach': 'palm-beach-fl-usa'
  'paris': 'paris-france'
  'philadelphia': 'philadelphia-pa-usa'
  'portland': 'portland-or-usa'
  'providence': 'providence-ri-usa'
  'rio-de-janeiro': 'rio-de-janeiro-brazil'
  'rome': 'rome-italy'
  'san-francisco': 'san-francisco-ca-usa'
  'san-juan': 'san-juan-puerto-rico'
  'santa-fe': 'santa-fe-nm-usa'
  'santa-monica': 'santa-monica-ca-usa'
  'sao-paulo': 'sao-paulo-brazil'
  'seattle': 'seattle-wa-usa'
  'seoul': 'seoul-south-korea'
  'shanghai': 'shanghai-china'
  'singapore': 'singapore-singapore'
  'stockholm': 'stockholm-sweden'
  'sydney': 'sydney-australia'
  'taipei': 'taipei-taiwan'
  'talinn': 'tallinn-estonia'
  'tbilisi': 'tbilisi-georgia'
  'tel-aviv': 'tel-aviv-yafo-israel'
  'tokyo': 'tokyo-japan'
  'toronto': 'toronto-canada'
  'vancouver': 'vancouver-canada'
  'venice': 'venice-italy'
  'vienna': 'vienna-austria'
  'washington': 'washington-dc-usa'
  'zurich': 'zurich-switzerland'

for oldSlug, newSlug of placesRedirects
  app.get "/shows/#{oldSlug}", ((slug) -> (req, res) ->
    res.redirect 301, "/shows/#{slug}"
  )(newSlug)
