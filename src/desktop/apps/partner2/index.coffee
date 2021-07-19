express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# TODO: Remove once we've rebuilt the partner article page in the new framework
app.get '/:id/article/:articleId', routes.requireNewLayout, routes.articles
