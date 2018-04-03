express = require 'express'
routes = require './routes.js'
embed = require 'particle'
{ resize, crop } = require '../../components/resizer'
{ toSentence } = require 'underscore.string'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop
app.locals.embed = embed
app.locals.toSentence = toSentence

app.get '/rss/news', routes.news
app.get '/rss/partner-updates', routes.partnerUpdates
