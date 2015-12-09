_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
embedVideo = require 'embed-video'
CurrentUser = require '../../models/current_user.coffee'
Article = require '../../models/article.coffee'
Artwork = require '../../models/artwork.coffee'
Articles = require '../../collections/articles.coffee'
Artworks = require '../../collections/artworks.coffee'
ShareView = require '../share/view.coffee'
CTABarView = require '../cta_bar/view.coffee'
initCarousel = require '../merry_go_round/index.coffee'
{ oembed } = require('embedly-view-helpers')(sd.EMBEDLY_KEY)
Q = require 'bluebird-q'
{ crop } = require '../resizer/index.coffee'
blurb = require '../gradient_blurb/index.coffee'
Sticky = require '../sticky/index.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
artworkItemTemplate = -> require(
  '../artwork_item/templates/artwork.jade') arguments...
editTemplate = -> require('./templates/edit.jade') arguments...
relatedTemplate = -> require('./templates/related.jade') arguments...
embedTemplate = -> require('./templates/embed.jade') arguments...

module.exports = class ArticleView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    { @article, @gradient, @waypointUrls, @seenArticleIds } = options
    new ShareView el: @$('.article-social')
    new ShareView el: @$('.article-share-fixed')
    @$window = $(window)
    @sticky = new Sticky
    @renderSlideshow()
    @renderArtworks =>
      @addReadMore() if @gradient
    @checkEditable()
    @breakCaptions()
    @sizeVideo()
    @setupFooterArticles()
    @setupStickyShare()
    @renderEmbedSections()

    @setupArticleWaypoints()
    @initFullscreenHeader($header) if ($header = @$('.article-fullscreen-video')).length
    @renderSuperArticle() if sd.RELATED_ARTICLES

    @trackPageview = _.once -> analyticsHooks.trigger 'scrollarticle', {}

  centerFullscreenHeader: ($header) ->
    # Center header
    # Note: Does not handle the content being bigger than the viewport
    $container = $header.find('.article-fullscreen-text-overlay')
    maxHeight = @$window.height()
    margin = Math.round((maxHeight - $container.height()) / 2)
    $container.css 'margin-top': "#{margin}px"

  initFullscreenHeader: ($header) ->
    @centerFullscreenHeader $header
    @$window.on 'resize', _.debounce (=> @centerFullscreenHeader($header)), 100

    # Show after css modifications are done
    $header.find('.main-layout-container').addClass 'visible'

  renderSlideshow: =>
    initCarousel @$('.js-article-carousel'), imagesLoaded: true

  renderArtworks: (cb) =>
    Q.all(for section in @article.get('sections') when section.type is 'artworks'
      Q.allSettled(
        for id in section.ids
          new Artwork(id: id).fetch
            success: (artwork) =>
              @$("[data-id=#{artwork.get '_id'}]").html(
                artworkItemTemplate artwork: artwork, artworkSize: ['larger', 'large']
              )
            error: (artwork) =>
              @$("[data-id=#{artwork.get 'id'}]").remove()
      ).spread (artworks...) =>
        artworks = _.pluck(_.reject(artworks, (artwork) -> artwork.state is 'rejected'), 'value')
        artworks = new Artworks artworks
        if artworks.length
          $el = @$("[data-layout=overflow_fillwidth]" +
            " li[data-id=#{artworks.first().get '_id'}]").parent()
        Q.nfcall @fillwidth, $el
    ).done =>
      cb()

  renderEmbedSections: =>
    sections = []
    Q.all( for section in @article.get('sections') when section.type is 'embed'
      $.get oembed(section.url, { maxwidth: @getWidth(section) })
    ).done (responses) =>
      if responses.length
        for section in @article.get('sections') when section.type is 'embed'
          $embedSection = $(".article-section-embed[data-id='#{section.url}']")
          $embedSectionContainer = $($embedSection.children('.article-embed-container')[0])
          response = responses.shift()
          # Use Embedly's iframe constructor or just generate our own iframe
          if response.html?
            $embedSectionContainer.html response.html
          else
            $embedSectionContainer.append embedTemplate url: section.url, height: section.height
          $embedSection.children('.loading-spinner').remove()

  getWidth: (section) ->
    if section.layout is 'overflow' then 1060 else 500

  breakCaptions: ->
    @$('.article-section-image').each ->
      imagesLoaded $(this), =>
        $(this).width $(this).children('img').width()

  fillwidth: (el, cb) ->
    if @$(el).length < 1 or $(window).width() < 700
      @$(el).parent().removeClass('is-loading')
      cb()
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
        cb()

  checkEditable: ->
    if (@user?.get('has_partner_access') and
       @user?.id is @article.get('author_id')) or
       @user?.isEditorialAdmin()
      editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
      message = if @article.get('published') then '' else "Draft"
      @renderedEditButton = true
      $(".article-container[data-id=#{@article.get('id')}] .article-content").append(
        editTemplate message: message, edit_url: editUrl
      )

  events:
    'click .articles-section-right-chevron, \
    .articles-section-left-chevron': 'toggleSectionCarousel'
    'click .article-video-play-button': 'playVideo'
    'click .article-sa-sticky-title' : 'toggleSuperArticleToC'

  toggleSectionCarousel: (e) ->
    @$('.articles-section-show-header-right').toggleClass('is-over')

  playVideo: (e) ->
    $cover = $(e.currentTarget).parent()
    $iframe = $cover.next('.article-video').find('iframe')
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

  setupStickyShare: ->
    @sticky.add $(".article-share-fixed[data-id=#{@article.get('id')}]")

  setupFooterArticles: =>
    if sd.SCROLL_ARTICLE is 'infinite'
      Q.allSettled([
        (tagRelated = new Articles).fetch
          data:
            tags: if @article.get('tags')?.length then @article.get('tags') else [null]
            sort: '-published_at'
            published: true
            tier: 1
            author_id: '503f86e462d56000020002cc'
        (artistRelated = new Articles).fetch
          data:
            artist_id: if @article.get('primary_featured_artist_ids')?.length then @article.get('primary_featured_artist_ids')[0]
            sort: '-published_at'
            published: true
            tier: 1
            author_id: '503f86e462d56000020002cc'
        (feed = new Articles).fetch
          data:
            author_id: '503f86e462d56000020002cc'
            published: true
            tier: 1
            sort: '-published_at'
            limit: 20
      ]).then =>
        safeRelated = _.union tagRelated.models, artistRelated.models, feed.models
        safeRelated = _.reject safeRelated, (a) =>
            a.get('id') is @article.get('id') or _.contains @seenArticleIds, a.get('id')
        $(".article-related-widget[data-id=#{@article.get('id')}]").html relatedTemplate
          related: _.shuffle safeRelated.slice(0,3)
          crop: crop
    else
      $(".article-related-widget[data-id=#{@article.get('id')}]").remove()

  addReadMore: =>
    maxTextHeight = 405 # line-height * line-count
    limit = 0
    textHeight = 0

    # Computes the height of the div where the blur should begin
    # based on the line count excluding images and video
    imagesLoaded $(".article-container[data-id=#{@article.get('id')}] .article-content"), =>
      for section in $(".article-container[data-id=#{@article.get('id')}] .article-content").children()
        if $(section).children().hasClass('article-section-text')
          textHeight = textHeight + $(section).children().height()
        if textHeight >= maxTextHeight
          limit = $(section).children('.article-section-text').position().top + $(section).children('.article-section-text').outerHeight()
          blurb $(".article-container[data-id=#{@article.get('id')}] .article-content"),
            limit: limit
            afterApply: =>
              @sticky.rebuild()
              @setupWaypointUrls() if @waypointUrls
              $(".article-container[data-id=#{@article.get('id')}] .gradient-blurb-read-more").on 'click', ->
                analyticsHooks.trigger 'readmore', {}
          break

  setupWaypointUrls: =>
    editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
    $(".article-container[data-id=#{@article.get('id')}]").waypoint (direction) =>
      window.history.pushState({}, @article.get('id'), @article.href()) if direction is 'down'
      $('.article-edit-container a').attr 'href', editUrl
      @trackPageview()
    $(".article-container[data-id=#{@article.get('id')}]").waypoint (direction) =>
      window.history.pushState({}, @article.get('id'), @article.href()) if direction is 'up'
      $('.article-edit-container a').attr 'href', editUrl
    , { offset: 'bottom-in-view' }

  # Methods for super articles
  toggleSuperArticleToC: ->
    if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', '0px'
    else
      @$superArticleNavToc.css 'max-height', "#{@superArticleNavMaxHeight}px"
    @$superArticleNavToc.toggleClass 'visible'

  renderSuperArticle: ->
    @$superArticleNavToc = @$('.article-sa-sticky-center .article-sa-related-container')

    # Set height
    _.defer =>
      @superArticleNavMaxHeight = @$superArticleNavToc.find('.article-sa-related').height() + @$('.article-sa-sticky-center').height() + 30

    throttledScroll = _.throttle((=> @onSuperArticleScroll()), 100)
    @$window.on 'scroll', throttledScroll

  onSuperArticleScroll: ->
    if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

  # Sets up waypoint for both fullscreen video and super article
  setupArticleWaypoints: ->
    $stickyHeader = @$('.article-sa-sticky-header')
    $fullscreenVideo = @$('.article-fullscreen-video')

    return unless $stickyHeader.length or $fullscreenVideo.length

    selector = if $('body').hasClass('body-fullscreen-article') then '.article-section-container' else '.article-section-container:first'
    @$(".article-container[data-id=#{@article.get('id')}] #{selector}").waypoint (direction) =>
      if direction == 'down'
        $stickyHeader.addClass 'visible'
        if $fullscreenVideo.length
          $fullscreenVideo.addClass 'hidden'
          @$el.removeClass 'body-transparent-header body-transparent-header-white'
      else
        $stickyHeader.removeClass 'visible'
        if $fullscreenVideo.length
          $fullscreenVideo.removeClass 'hidden'
          @$el.addClass 'body-transparent-header body-transparent-header-white'
