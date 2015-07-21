Articles = require '../../collections/articles'
moment = require 'moment'

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: 100
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(5, 'days'))
      res.set('Content-Type', 'text/xml')
      res.render('articles', { pretty: true, articles: recentArticles })