#
# Pages like Terms of Use, Privacy, etc. that display relatively static content.
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
app.get '/security', routes.vanityUrl('security')
app.get '/press', (req, res) -> res.redirect '/about/page/press'
app.get '/conditions-of-sale', routes.vanityUrl('conditions-of-sale')
app.get '/auction-info', routes.vanityUrl('auction-info')
app.get '/embed-terms', routes.vanityUrl('embed-terms')
app.get '/embeddable-artists', routes.vanityUrl('embeddable-artists')

app.get '/job/:id', routes.index
# Handle urls like /job/devops-engineer/about
app.get '/job/:id/*', routes.index
