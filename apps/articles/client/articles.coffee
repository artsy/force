_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'

module.exports.init = ->
  articles = new Articles sd.ARTICLES
  articles.count = sd.ARTICLES_COUNT
  articles.reset articles.feed()

  view = new ArticlesFeedView
    el: $('#articles-articles-feed')
    collection: articles
    fetchWith:
      limit: 50
      published: true
      author_id: '503f86e462d56000020002cc'
      featured: true

  view.render()
