_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
sd = require('sharify').data

module.exports.init = ->
  return # TODO: Something is screwy with the component & counts
  articles = new Articles sd.ARTICLES
  articles.count = sd.ARTICLES_COUNT
  articles.reset articles.feed()

  view = new ArticlesFeedView
    el: $('.articles-articles-feed')
    collection: articles
    fetchWith:
      limit: 50
      published: true
      vertical_id: sd.VERTICAL.id
      sort: '-published_at'

  view.render()