_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Artwork = require '../../../models/artwork.coffee'
ShareView = require '../../../components/share/view.coffee'
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    new ShareView el: @$('#articles-social')
    @setupSlideshow()
    @renderArtworks()

  setupSlideshow: ->
    return unless @article.get('sections')[0].type is 'slideshow'
    if @article.slideshowArtworks.length
      done = _.after @article.slideshowArtworks.length, @renderSlideshow
      @article.slideshowArtworks.map (a) -> a.fetch success: done
    else
      @renderSlideshow()

  renderSlideshow: =>
    @$('#articles-slideshow-container .loading-spinner').remove()
    @$('#articles-slideshow').html (for item in @article.get('sections')[0].items
      switch item.type
        when 'image'
          "<li><img src='#{item.url}'></li>"
        when 'artwork'
          "<li>" +
            artworkItemTemplate(
              artwork: @article.slideshowArtworks.get(item.id)
              artworkSize: 'large'
            ) +
          "</li>"
    ).join('')
    @$('#articles-slideshow').height 'auto'

  renderArtworks: ->
    for section in @article.get('sections') when section.type is 'artworks'
      for id in section.ids
        new Artwork(id: id).fetch success: (artwork) =>
          @$("[data-id=#{artwork.get '_id'}]").html(
            artworkItemTemplate artwork: artwork, artworkSize: 'larger'
          ).removeClass 'articles-section-artworks-loading'



module.exports.init = ->
  new ArticleView el: $('body'), article: new Article(sd.ARTICLE)
