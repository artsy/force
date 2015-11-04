_ = require 'underscore'
Articles = require '../../collections/articles'
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
      res.set('Content-Type', 'application/rss+xml')
      res.render('news', { articles: articles })