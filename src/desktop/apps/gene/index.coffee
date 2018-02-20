#
# The gene page at /gene/:id.
#
# Comes with a varying set of UI:
#   * Header with blurb copy and follow/share widgets
#   * Artists tab with fillwidth rows listing iconic artists
#   * Filter tab that lets you filter within a gene
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/gene/:id', routes.index
app.get '/gene/:id/*', routes.index
