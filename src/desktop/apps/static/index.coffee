#
# A collection of more or less static pages that live under artsy.net urls.
# Examples could include a year in review or a stumble upon page.
#
# Why not just drop in a bunch of .html files on S3 and use shortcuts?
# Who wants to write html!? This lets us be lazy about easily leveraging
# existing UI components and preprocessors like stylus/jade. ༼;´༎ຶ ۝ ༎ຶ༽
#

express = require 'express'
{ Page } = require '../../models/page'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/the-future-of-art', (req, res) ->
  new Page(id: 'future-of-art').fetch
    cache: true
    error: res.backboneError
    success: (page) ->
      res.render 'future_of_art', page: page

app.get '/christies-spring-auctions-2015', (req, res) ->
  res.render 'christies', require './data/christies.json'
