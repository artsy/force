_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
{ API_URL, POSITRON_URL } = require('sharify').data
artsyXapp = require 'artsy-xapp'
PAGE_SIZE = 100

@news = (req, res, next) ->
  new Articles().fetch
    data:
      # id for "Artsy Editorial" (exclude partner posts)
      author_id: "503f86e462d56000020002cc"
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(2, 'days'))
      res.set('Content-Type', 'text/xml')
      res.render('news', { articles: recentArticles })
