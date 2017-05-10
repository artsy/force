_ = require 'underscore'
Backbone = require 'backbone'
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
GalleryInsightsView = require '../../../components/email/client/gallery_insights.coffee'
sd = require('sharify').data

module.exports = class SectionView extends Backbone.View

  initialize: ->
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

  events:
    'click .venice-redirect-banner a.icon-close' : 'closeVeniceBanner'

  closeVeniceBanner: (e) ->
    e.preventDefault()
    $('.venice-redirect-banner').fadeOut()

module.exports.init = ->
  new SectionView el: $('body')
  new GalleryInsightsView el: $('body')
