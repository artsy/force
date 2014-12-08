#
# /article/:id
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Permalink routes
app.get '/articles', routes.getArticle, routes.index
app.get '/articles/:id', routes.getArticle, routes.redirectToFullUrl
app.get '/articles/:id/:slug', routes.getArticle, routes.show

# If there's a lab feature enabled hijack some other routes
app.get '/post/:id', (req, res, next) ->
  if 'Articles' in (req.user?.get('lab_features') or [])
    res.redirect "/articles/#{req.params.id}"
  else
    next()