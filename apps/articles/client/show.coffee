_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
CarouselView = require '../../../components/carousel/view.coffee'
carouselTemplate = -> require('../templates/carousel.jade') arguments...
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...
Q = require 'q'
FillwidthView = require '../../../components/fillwidth_row/view.coffee'

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    new ShareView el: @$('#articles-social')
    @setupSlideshow()
    @renderArtworks()
    if $(@article.get 'lead_paragraph').text().trim() is ''
      @$('#articles-lead-paragraph').hide()

  setupSlideshow: ->
    return unless @article.get('sections')[0].type is 'slideshow'
    if @article.slideshowArtworks.length
      done = _.after @article.slideshowArtworks.length, @renderSlideshow
      @article.slideshowArtworks.map (a) -> a.fetch success: done
    else
      @renderSlideshow()

  renderSlideshow: =>
    @$('#articles-slideshow-inner').html carouselTemplate
      article: @article
      carouselFigures: @article.get('sections')[0].items
    @carouselView = new CarouselView
      el: $('#articles-slideshow-inner')
      height: 500
      align: 'left'
    @$el.imagesLoaded =>
      @carouselView.postRender()
      @carouselView.$decoys.hide()
      @$('#articles-slideshow-inner .loading-spinner').hide()

  renderArtworks: ->
    for section in @article.get('sections') when section.type is 'artworks'
      Q.all(
        for id in section.ids
          new Artwork(id: id).fetch success: (artwork) =>
            @$("[data-id=#{artwork.get '_id'}]").html(
              artworkItemTemplate artwork: artwork, artworkSize: 'larger'
            ).removeClass 'articles-section-artworks-loading'
      ).spread (artworks...) =>
        artworks = new Artworks artworks
        $el = @$("[data-layout=overflow_fillwidth]" +
          " li[data-id=#{artworks.first().get '_id'}]").parent()
        return unless $el.length
        fillwidthView = new FillwidthView
          doneFetching: true
          collection: artworks
          el: $el
        fillwidthView.render()
        fillwidthView.hideSecondRow()

module.exports.init = ->
  new ArticleView el: $('body'), article: new Article(sd.ARTICLE)
