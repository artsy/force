_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
GalleryInsightsView = require '../../../components/email/client/gallery_insights.coffee'
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
      section_id: sd.SECTION.id
      sort: '-published_at'
  feedView.render()
  new GalleryInsightsView el: $('body')
