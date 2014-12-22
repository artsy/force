_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Articles = require '../../../collections/articles.coffee'
ShareView = require '../../../components/share/view.coffee'
feedTemplate = -> require('../templates/feed.jade') arguments...
{ resize, crop } = require '../../../components/resizer/index.coffee'
moment = require 'moment'

module.exports.MagazineView = class MagazineView extends Backbone.View

  initialize: (options) ->
    @offset = 0
    { @articles } = options
    @articles.on 'sync', @renderArticles
    @attachShareViews()

  renderArticles: =>
    @$('#articles-magazine-feed-list').html(
      html = feedTemplate
        articles: @articles.models
        crop: crop
        moment: moment
        sd: sd
    )
    @attachShareViews()

  attachShareViews: ->
    @$('.aaf-share').each (i, el) ->
      return if $(el).attr('data-hydrated')
      new ShareView el: $(el)
      $(el).attr('data-hydrated', true)

  events:
    'click #articles-magazine-feed button': 'moreArticles'

  moreArticles: ->
    $btn = @$('#articles-magazine-feed button')
    $btn.addClass 'is-loading'
    @articles.fetch
      data:
        offset: (@offset += 50)
        limit: 50
        published: true
        # Artsy Editorial. TODO: When we launch Writer externally drop this.
        author_id: '503f86e462d56000020002cc'
      remove: false
      complete: -> $btn.removeClass 'is-loading'

module.exports.init = ->
  new MagazineView
    el: $('body')
    articles: new Articles sd.ARTICLES