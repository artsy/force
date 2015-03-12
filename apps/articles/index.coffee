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
app.get '/post/:id', routes.redirectPost
app.get '/magazine', routes.magazine
app.get '/article/:slug', routes.show
