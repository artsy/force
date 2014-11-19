sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
artworkItemTemplate = require '../../../components/artwork_item/templates/artwork.jade'

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    @setupSlideshow()

  setupSlideshow: ->
    return unless @article.slideshowArtworks?
    $.when.apply(null, @article.slideshowArtworks.map (a) -> a.fetch()).then =>
      @$('#articles-slideshow').html @article.slideshowArtworks.map((a) ->
        "<li>" + artworkItemTemplate(artwork: a, artworkSize: 'large') + "</li>"
      ).join('')

module.exports.init = ->
  new ArticleView el: $('body'), article: new Article(sd.ARTICLE)
