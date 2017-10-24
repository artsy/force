#
# /article/:id
#

express = require 'express'
routes = require './routes'
{ resize, crop } = require '../../components/resizer'
{ toSentence } = require 'underscore.string'
markdown = require '../../components/util/markdown'
adminOnly = require '../../lib/admin_only'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop
app.locals.toSentence = toSentence
app.locals.markdown = markdown

# Permalink routes
app.get '/post/:id', routes.redirectPost
app.get '/:id/posts', routes.redirectPost
app.get '/article/:slug/amp', routes.ampArticle
app.get '/article/:slug', routes.article
app.get '/article1/:slug', adminOnly, routes.article # Remove after article2 launch
app.post '/editorial-signup/form', routes.editorialForm
