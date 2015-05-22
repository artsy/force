_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ShareView = require '../../../components/share/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
artworkItemTemplate = -> require(
  '../../../components/artwork_item/templates/artwork.jade') arguments...
Q = require 'q'
imagesLoaded = require 'imagesloaded'
embedVideo = require 'embed-video'
CurrentUser = require '../../../models/current_user.coffee'
editTemplate = -> require('../templates/edit.jade') arguments...
initCarousel = require '../../../components/merry_go_round/index.coffee'
CTABarView = require '../../../components/cta_bar/view.coffee'

module.exports.ArticleView = class ArticleView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    { @article, @slideshowArtworks } = options
    new ShareView el: @$('.articles-social')
    @renderSlideshow() if @slideshowArtworks?.length
    @renderArtworks()
    @breakCaptions()
    @checkEditable()
    @sizeVideo()
    @renderGalleryInsightsCTA() if @article.get('vertical_id') is '55550be07b8a750300db8430'

  renderSlideshow: =>
    initCarousel $('.js-article-carousel'), imagesLoaded: true

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
    if (@user?.get('has_partner_access') and
       @user?.id is @article.get('author_id')) or
       @user?.isEditorialAdmin()
      editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
      message = if @article.get('published') then '' else "Draft"
      @renderedEditButton = true
      @$('#articles-body-container').append(
        editTemplate message: message, edit_url: editUrl
      )

  events:
    'click .articles-vertical-right-chevron, \
    .articles-vertical-left-chevron': 'toggleVerticalCarousel'
    'click .articles-video-play-button': 'playVideo'
    'click .js-articles-insights-subscribe': 'subscribeGalleryInsights'

  toggleVerticalCarousel: (e) ->
    @$('.articles-vertical-show-header-right').toggleClass('is-over')

  playVideo: (e) ->
    $cover = $(e.currentTarget).parent()
    $iframe = $cover.next('.articles-video').find('iframe')
    $newIframe = $iframe.clone().attr('src', $iframe.attr('src') + '&autoplay=1')
    $iframe.replaceWith $newIframe
    $cover.remove()

  sizeVideo: ->
    $videos = @$("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']")

    calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) ->
      ratio = Math.min maxWidth / srcWidth, maxHeight / srcHeight
      { width: srcWidth*ratio, height: srcHeight*ratio }

    resizeVideo = ->
      newHeight = $(window).height() - 100

      $videos.each ->
        $el = $(this)
        $parent = $el.parent()
        c_width = $parent.outerWidth()
        c_height = $parent.outerHeight()
        maxHeight = if (newHeight < c_height) then newHeight else (c_width * .5625)
        { width, height } = calculateAspectRatioFit $el.width(), $el.height(), $parent.outerWidth(), maxHeight

        left = Math.max(0, ((c_width - width) / 2)) + "px"
        top = Math.max(0, ((c_height - height) / 2)) + "px"

        $el
          .height(height)
          .width(width)
          .css
            left: left
            top: top

    $(window).resize(_.debounce(resizeVideo, 100))
    resizeVideo()

  renderGalleryInsightsCTA: ->
    ctaBarView = new CTABarView
      headline: 'Artsy Insights for Galleries'
      mode: 'smaller-with-email'
      name: 'gallery-insights-signup'
      persist: true
      subHeadline: "Recieve periodical insights from Artsy's Gallery Team"
      email: sd.CURRENT_USER?.email or ''
    unless ctaBarView.previouslyDismissed()
      $('body').append ctaBarView.render().$el
      $('#articles-footer-list').waypoint (direction) ->
        ctaBarView.transitionIn() if direction is 'down'
      , { offset: '50%' }

  subscribeGalleryInsights: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/articles/form'
      data:
        email: $(e.currentTarget).prev('input').val()
        fname: sd.CURRENT_USER?.name?.split(' ')[0] or= ''
        lname: sd.CURRENT_USER?.name?.split(' ')[1] or= ''
      error: (xhr) ->
        @$(e.currentTarget).removeClass 'is-loading'
        console.log xhr
        # DO SOMETHING HERE.
      success: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
        @$('.articles-insights').fadeOut()
        @$('.articles-insights-thanks').fadeIn()
        @$('.cta-bar-small').fadeOut( ->
          @$('.cta-bar-thanks').fadeIn()
        )
        setTimeout( ->
          @$('.cta-bar-defer').click()
        ,2000)

module.exports.init = ->
  article = new Article sd.ARTICLE
  slideshowArtworks = new Articles sd.SLIDESHOW_ARTWORKS
  new ArticleView
    el: $('body')
    article: article
    slideshowArtworks: slideshowArtworks
