#
# /article/:id
#

express = require 'express'
routes = require './routes'
{ resize, crop } = require '../../components/resizer'
{ toSentence } = require 'underscore.string'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop
app.locals.toSentence = toSentence

# Permalink routes
app.get '/posts', routes.redirectMagazine
app.get '/magazine', routes.redirectMagazine
app.get '/articles', routes.articles
app.get sd.TEAM_BLOGS, routes.teamChannel
app.get '/venice-biennale-2015', routes.section
app.post '/editorial-signup/form', routes.editorialForm
app.get '/gallery-insights/opt-in', (_, res) -> res.redirect '/gallery-insights'
