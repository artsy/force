_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
GalleryInsightsView = require '../../../components/email/client/gallery_insights.coffee'
sd = require('sharify').data

module.exports.init = ->
  articles = new Articles sd.ARTICLES
  articles.count = sd.ARTICLES_COUNT + 4
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
  feedView.render() if sd.ARTICLES_COUNT > sd.ARTICLES.length
  new GalleryInsightsView el: $('body')
