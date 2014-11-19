_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    @setupSlideshow()

  setupSlideshow: ->
    return unless @article.slideshowArtworks?.length
    done = _.after @article.slideshowArtworks.length, =>
      @$('#articles-slideshow').html @article.slideshowArtworks.map((a) ->
        "<li>" + artworkItemTemplate(artwork: a, artworkSize: 'large') + "</li>"
      ).join('')
    @article.slideshowArtworks.map (a) -> a.fetch success: done

module.exports.init = ->
  new ArticleView el: $('body'), article: new Article(sd.ARTICLE)
