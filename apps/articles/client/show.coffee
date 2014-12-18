_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
CarouselView = require '../../../components/carousel/view.coffee'
carouselTemplate = -> require('../templates/carousel.jade') arguments...
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...
Q = require 'q'
imagesLoaded = require 'imagesloaded'

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    new ShareView el: @$('.articles-social')
    @setupSlideshow()
    @renderArtworks()
    @breakCaptions()
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
            )
      ).spread (artworks...) =>
        artworks = new Artworks artworks
        $el = @$("[data-layout=overflow_fillwidth]" +
          " li[data-id=#{artworks.first().get '_id'}]").parent()
        return unless $el.length
        @fillwidth $el

  breakCaptions: ->
    @$('.articles-section-image').each ->
      imagesLoaded $(this), =>
        $(this).width $(this).children('img').width()

  fillwidth: (el) ->
    return if $(window).width() < 700
    $list = @$(el)
    $imgs = $list.find('img')
    imagesLoaded $list[0], =>
      #
      # TODO: Open source into fillwidthLite or something
      #

      # The height we're aiming for the row to be
      targetHeight = 500

      # Map the image DOM els into objects of dimension data for performance.
      imgs = $imgs.map(->
        { width: $(this).width(), height: $(this).height(), $el: $(this) }
      ).toArray()

      # Helpers to do the mathz.
      imgsWidth = ->
        _.reduce _.map(imgs, (i) -> i.width), (m, n) -> m + n
      widthDiff = ->
        Math.abs $list.width() - imgsWidth()
      resize = (img, dir) ->
        img.width += (img.width / img.height) * dir
        img.height += dir

      # Resize all imgs to a uniform height maintaining aspect ratio
      for img in imgs
        img.width = img.width * (targetHeight / img.height)
        img.height = targetHeight

      # Decide whether we need to make the row of imgs smaller or larger to
      # fit the width of the container
      dir = if imgsWidth() > $list.width() then -1 else 1

      # Resize each img, maintaining aspect ratio, until the row fits
      i = 0
      while widthDiff() > 1
        for img in imgs
          resize img, dir
          break if widthDiff() <= 1
        break if i += 1 > 9999

      # Round off sizes
      for img in imgs
        img.width = Math.floor img.width
        img.height = Math.floor img.height
        break if widthDiff() is 0

      # Apply to DOM
      for img in imgs
        $li = img.$el.closest('li')
        img.$el.height(img.height)
        $li.width(img.width).css(padding: '0 15px')
      $list.parent().removeClass('is-loading')

module.exports.init = ->
  new ArticleView el: $('body'), article: new Article(sd.ARTICLE)
