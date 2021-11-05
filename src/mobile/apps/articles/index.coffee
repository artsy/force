express = require 'express'
routes = require './routes'
{ resizer: { resize, crop } } = require '../../components/resizer'
{ toSentence } = require 'underscore.string'
{ pluck } = require 'underscore'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop
app.locals.toSentence = toSentence
app.locals.pluck = pluck

app.get '/article/:id', routes.article
app.get '/posts', routes.redirectPost
app.get '/post/:id', routes.redirectPost
app.get '/:id/posts', routes.redirectPost
app.get '/articles', routes.articles
app.get '/venice-biennale-2015', routes.section

