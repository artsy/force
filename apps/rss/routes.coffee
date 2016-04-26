_ = require 'underscore'
sd = require('sharify').data
Articles = require '../../collections/articles'
PAGE_SIZE = 100

@news = (req, res, next) ->
  new Articles().fetch
    data:
      # id for "Artsy Editorial" (exclude partner posts)
      author_id: sd.ARTSY_EDITORIAL_ID
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      res.set('Content-Type', 'application/rss+xml')
      res.render('news', articles: articles, pretty: true)

@instantArticles = (req, res, next) ->
  new Articles().fetch
    data:
      author_id: sd.ARTSY_EDITORIAL_ID
      published: true
      sort: '-updated_at'
      instant_article: true
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      articles.each (article) -> article.prepForInstant()
      res.set('Content-Type', 'application/rss+xml')
      res.render 'instant_articles',
        articles: articles
        pretty: true
