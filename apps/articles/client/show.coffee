_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
CarouselView = require '../../../components/carousel/view.coffee'
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...
Q = require 'q'
imagesLoaded = require 'imagesloaded'
embedVideo = require 'embed-video'

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    { @article, @slideshowArtworks } = options
    new ShareView el: @$('.articles-social')
    @renderSlideshow() if @slideshowArtworks?.length
    @renderArtworks()
    @breakCaptions()
    if $(@article.get 'lead_paragraph').text().trim() isnt ''
      @$('#articles-lead-paragraph').show()

  renderSlideshow: =>
    @$('.artwork-item').each -> $(this).width $(this).find('img').width()
    @carouselView = new CarouselView
      el: $('#articles-slideshow-inner')
      height: 500
      align: 'left'
    @carouselView.postRender()
    @$('#articles-slideshow-inner .loading-spinner').hide()
    if @article.get('sections')[0].items?.length is 1
      @$('.carousel-controls').hide()

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
    return @$(el).parent().removeClass('is-loading') if $(window).width() < 700
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
      resizeHeight = (img, dir) ->
        img.width += (img.width / img.height) * dir
        img.height += dir

      # Resize all imgs to a uniform height maintaining aspect ratio
      for img in imgs
        img.width = img.width * (targetHeight / img.height)
        img.height = targetHeight

      # Decide whether we need to make the row of imgs smaller or larger to
      # fit the width of the container
      dir = if imgsWidth() > $list.width() then -1 else 1

      # Resize each img, maintaining aspect ratio, until the row fits the
      # width of the container
      i = 0
      until widthDiff() < 1
        for img in imgs
          resizeHeight img, dir
          break if widthDiff() < 1
        break if i += 1 > 999

      # Resize down to accomodate padding
      i = 0
      totalWhitespace = imgs.length * 30
      until imgsWidth() <= $list.width() - totalWhitespace
        for img in imgs
          resizeHeight img, -1
          break if imgsWidth() <= $list.width() - totalWhitespace
        break if i += 1 > 999

      # Round off sizes
      for img in imgs
        img.width = Math.floor img.width
        img.height = Math.floor img.height
        break if widthDiff() is 0

      # Apply to DOM
      for img in imgs
        $li = img.$el.closest('li')
        $li.css(padding: '0 15px').width(img.width)

      # Make sure the captions line up in case rounding off skewed things
      tallest = _.max $list.find('.artwork-item-image-container').map(->
        $(this).height()).toArray()
      $list.find('.artwork-item-image-container').each -> $(this).height tallest

      # Remove loading state
      $list.parent().removeClass('is-loading')

module.exports.init = ->
  article = new Article sd.ARTICLE
  slideshowArtworks = new Articles sd.SLIDESHOW_ARTWORKS
  new ArticleView
    el: $('body')
    article: article
    slideshowArtworks: slideshowArtworks
