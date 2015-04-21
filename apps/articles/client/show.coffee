_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
CarouselView = require '../../../components/carousel/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...
Q = require 'q'
imagesLoaded = require 'imagesloaded'
embedVideo = require 'embed-video'
CurrentUser = require '../../../models/current_user.coffee'
editTemplate = -> require('../templates/edit.jade') arguments...

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    { @article, @slideshowArtworks } = options
    new ShareView el: @$('.articles-social')
    @renderSlideshow() if @slideshowArtworks?.length
    @renderArtworks()
    @breakCaptions()
    @checkEditable()

  renderSlideshow: =>
    @carouselView = new CarouselView
      el: $('#articles-slideshow-inner')
      height: 500
      align: 'left'
      hasDimensions: false
    @carouselView.postRender()
    @$('.artwork-item').each (i, item) -> $(item).width $(item).find('img').width()
    if @article.get('sections')[0].items?.length is 1
      @$('.carousel-controls').hide()

  renderArtworks: ->
    Q.all(for section in @article.get('sections') when section.type is 'artworks'
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
    ).then =>
      console.log 'here a trigger'
      analyticsHooks.trigger 'article:fullyloaded', @article.id

  breakCaptions: ->
    @$('.articles-section-image').each ->
      imagesLoaded $(this), =>
        $(this).width $(this).children('img').width()

  fillwidth: (el) ->
    return @$(el).parent().removeClass('is-loading') if $(window).width() < 700
    $list = @$(el)
    $list.fillwidthLite
      gutterSize: 30
      apply: (img) ->
        img.$el.closest('li').css(padding: '0 15px').width(img.width)
      done: ->
        # Make sure the captions line up in case rounding off skewed things
        tallest = _.max $list.find('.artwork-item-image-container').map(->
          $(this).height()).toArray()
        $list.find('.artwork-item-image-container').each -> $(this).height tallest
        # Remove loading state
        $list.parent().removeClass('is-loading')

  checkEditable: ->
    if (@user?.get('has_partner_access') and @user?.id is @article.get('author_id')) or
       @user?.get('type') is 'Admin' and @user?.get('email')?.split('@')[0] in sd.EDITORIAL_ADMINS.split(',')
      editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
      @article.get('published') is true ? message = "Previewing Draft" : message = ""
      @renderedEditButton = true
      @$('#main-layout-container').append(
        editTemplate message: message, edit_url: editUrl
      )

module.exports.init = ->
  article = new Article sd.ARTICLE
  slideshowArtworks = new Articles sd.SLIDESHOW_ARTWORKS
  new ArticleView
    el: $('body')
    article: article
    slideshowArtworks: slideshowArtworks