_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
EditorialSignupView = require '../../../components/email/client/editorial_signup.coffee'
sd = require('sharify').data

module.exports.init = ->
  articles = new Articles sd.ARTICLES
  articles.reset articles.feed()
  feedView = new ArticlesFeedView
    el: $('.articles-articles-feed')
    collection: articles
    fetchWith:
      limit: 50
      published: true
      featured: true
      sort: '-published_at'
  feedView.render()
  new EditorialSignupView el: $('body')
