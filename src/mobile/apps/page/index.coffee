#
# Pages like Terms of Use, Privacy, about, etc. that display relatively static content.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/terms', routes.vanityUrl('terms')
app.get '/past-terms', routes.vanityUrl('past-terms')
app.get '/past-terms-10-29-12', routes.vanityUrl('past-terms-10-29-12')
app.get '/privacy', routes.vanityUrl('privacy')
app.get '/past-privacy', routes.vanityUrl('past-privacy')
app.get '/past-privacy-10-29-12', routes.vanityUrl('past-privacy-10-29-12')
app.get '/security', routes.vanityUrl('security')
app.get '/press', routes.vanityUrl('press')
app.get '/conditions-of-sale', routes.vanityUrl('conditions-of-sale')
app.get '/auction-info', routes.vanityUrl('auction-info')
app.get '/embed-terms', routes.vanityUrl('embed-terms')
app.get '/subscription-sellers-agreement', routes.vanityUrl('subscription-sellers-agreement')
app.get '/cms-sellers-agreement', routes.vanityUrl('cms-sellers-agreement')
app.get '/past-terms-8-5-13', routes.vanityUrl('past-terms-8-5-13')
app.get '/past-privacy-10-29-12', routes.vanityUrl('past-privacy-10-29-12')
app.get '/rrf-emerging-curator-competition-official-rules', routes.vanityUrl('rrf-emerging-curator-competition-official-rules')
app.get '/about/page/press', routes.vanityUrl('press-list')
app.get '/about/page/events', routes.vanityUrl('events')
app.get '/how-auctions-work-buyers-premium-taxes-and-fees', routes.vanityUrl('how-auctions-work-buyers-premium-taxes-and-fees')

app.get '/job/:id', routes.index
app.get '/job/:id/*', routes.index
