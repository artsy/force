#
# /article/:id
#

express = require 'express'
routes = require './routes'
{ resize, crop } = require '../../components/resizer'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop

# Permalink routes
app.get '/posts', routes.redirectMagazine
app.get '/magazine', routes.redirectMagazine
app.get '/articles', routes.articles
app.get '/:slug', routes.teamChannel
app.post '/editorial-signup/form', routes.editorialForm