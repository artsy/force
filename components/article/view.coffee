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
{ Following, FollowButton } = require '../follow_button/index.coffee'
initCarousel = require '../merry_go_round/bottom_nav_mgr.coffee'
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
calloutTemplate = -> require('./templates/callout.jade') arguments...

DATA =
  sort: '-published_at'
  published: true
  tier: 1
  author_id: sd.ARTSY_EDITORIAL_ID

module.exports = class ArticleView extends Backbone.View

  events:
    'click .articles-section-right-chevron, \
    .articles-section-left-chevron': 'toggleSectionCarousel'
    'click .article-video-play-button': 'playVideo'
    'click .article-fullscreen-down-arrow a': 'scrollPastFullscreenHeader'

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @following = new Following(null, kind: 'artist') if @user?
    { @article, @gradient, @waypointUrls, @seenArticleIds } = options
    new ShareView el: @$('.article-social')
    new ShareView el: @$('.article-share-fixed')
    @loadedArtworks = @loadedEmbeds = @loadedCallouts = @loadedImageHeights = false
    @$window = $(window)
    @sticky = new Sticky

    # Render sections
    @renderSlideshow()
    @renderArtworks()
    @renderEmbedSections()
    @renderCalloutSections()
    @setupFooterArticles()
    @setupStickyShare()
    @setupFollowButtons()

    # Resizing
    @sizeVideo()

    # FS and Super Article setup
    @setupArticleWaypoints()
    @initFullscreenHeader($header) if ($header = @$('.article-fullscreen')).length
    @renderSuperArticle() if sd.RELATED_ARTICLES?.length > 0

    # Utility
    @checkEditable()
    @trackPageview = _.once -> analyticsHooks.trigger 'scrollarticle', {urlref: options.previousHref || ''}

  centerFullscreenHeader: ($header) ->
    # Center header
    $container = $header.find('.article-fullscreen-text-overlay')
    maxHeight = @$window.height()
    margin = Math.round((maxHeight - $container.height()) / 2)
    minMargin = 158
    if margin < minMargin
      margin = minMargin

      # fix for small screens
      headerHeight = $container.height() + (margin * 2)
      @$('.article-fullscreen, .article-fullscreen-overlay, .article-fullscreen-video-player, .article-fullscreen-image').css 'min-height', headerHeight

    $container.css 'margin-top': "#{margin}px"

  initFullscreenHeader: ($header) ->
    @centerFullscreenHeader $header

    $superArticleArrow = @$('.article-fullscreen-down-arrow')
    $superArticleArrow.css 'top': @$('.article-fullscreen').height() - 100
    $superArticleArrow.show()

    @$window.on 'resize', _.debounce (=> @centerFullscreenHeader($header)), 100

    # Show after css modifications are done
    $header.find('.main-layout-container').addClass 'visible'

  maybeFinishedLoading: ->
    if @loadedArtworks and @loadedEmbeds and @loadedCallouts and not @loadedImageHeights
      @setupMaxImageHeights()
    else if @loadedArtworks and @loadedEmbeds and @loadedCallouts and @loadedImageHeights
      @breakCaptions()
      @setupWaypointUrls() if @waypointUrls
      @addReadMore() if @gradient

  setupMaxImageHeights: ->
    @$(".article-section-artworks[data-layout=overflow] img, .article-section-image img").css('max-height', window.innerHeight * 0.7 )
    @loadedImageHeights = true
    @maybeFinishedLoading()

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
      @loadedArtworks = true
      @maybeFinishedLoading()

  renderEmbedSections: =>
    sections = []
    Q.all( for section in @article.get 'sections' when section.type is 'embed'
      $.get oembed section.url, { maxwidth: @getWidth(section) }
    ).then (responses) =>
      if responses.length
        for section in @article.get('sections') when section.type is 'embed'
          $embedSection = @$(".article-section-embed[data-id='#{section.url}']")
          $embedSectionContainer = $($embedSection.children('.article-embed-container')[0])
          response = responses.shift()
          # Use Embedly's iframe constructor or just generate our own iframe
          if response.html?
            $embedSectionContainer.html response.html
          else
            $embedSectionContainer.append embedTemplate url: section.url, height: section.height
          $embedSection.children('.loading-spinner').remove()
    .done =>
      @loadedEmbeds = true
      @maybeFinishedLoading()

  renderCalloutSections: =>
    Q.allSettled( for section in @article.get('sections') when section.type is 'callout' and section.article.length > 0
      new Article(id: section.article).fetch()
    ).then (articles) =>
      articles = _.pluck(_.reject(articles, (article) -> article.state is 'rejected'), 'value')
      for section in @article.get('sections') when section.type is 'callout' and section.article.length > 0
        $calloutSection = @$(".article-section-callout-container[data-id=#{section.article}]")
        article = _.find articles, { id: section.article }
        $($calloutSection).append calloutTemplate
          section: section
          calloutArticle: new Article article if article
          crop: crop
    .done =>
      @loadedCallouts = true
      @maybeFinishedLoading()

  setupFollowButtons: ->
    @artists = []
    @$('.artist-follow').each (i, artist) =>
      @artists.push id: $(artist).data('id')
    @followButtons = @artists.map (artist) =>
      new FollowButton
        el: @$(".artist-follow[data-id='#{artist.id}']")
        following: @following
        modelName: 'artist'
        model: artist
        analyticsFollowMessage: 'Followed artist, via article'
        analyticsUnfollowMessage: 'Unfollowed artist, via article'
        href: sd.APP_URL + sd.CURRENT_PATH
    @following.syncFollows(_.pluck @artists, 'id') if @user?

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
    # Do not render footer articles if the article has related articles (is/is in a super article)
    if sd.SCROLL_ARTICLE is 'infinite' and sd.RELATED_ARTICLES?.length < 1
      Q.allSettled([
        (tagRelated = new Articles).fetch
          data: _.extend _.clone DATA,
            tags: if @article.get('tags')?.length then @article.get('tags') else [null]
        (artistRelated = new Articles).fetch
          data: _.extend _.clone DATA,
            artist_id: if @article.get('primary_featured_artist_ids')?.length then @article.get('primary_featured_artist_ids')[0]
        (feed = new Articles).fetch
          data: _.extend _.clone DATA,
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
      if direction is 'down'
        window.history.replaceState({}, @article.get('id'), @article.href())
        $('.article-edit-container a').attr 'href', editUrl
        @trackPageview()
    $(".article-container[data-id=#{@article.get('id')}]").waypoint (direction) =>
      if direction is 'up'
        window.history.replaceState({}, @article.get('id'), @article.href())
        $('.article-edit-container a').attr 'href', editUrl
    , { offset: 'bottom-in-view' }

  # Methods for super articles
  duration: 500
  scrollPastFullscreenHeader: ->
    position = @$('.article-fullscreen').height()
    (@$htmlBody ?= $('html, body'))
      .animate { scrollTop: position }, @duration
    false

  renderSuperArticle: ->
    @$superArticleNavToc = @$('.article-sa-sticky-center .article-sa-related-container')

    @$('.article-sa-sticky-center .article-sa-sticky-title').hover =>
      return if @$superArticleNavToc.hasClass('visible')
      height = @$superArticleNavToc.find('.article-sa-related').height() + @$('.article-sa-sticky-center').height() + 50
      @$superArticleNavToc.css 'max-height', "#{height}px"
      @$superArticleNavToc.addClass 'visible'


    @$('.article-sa-sticky-header').mouseleave =>
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

    @$('footer').hide()

    throttledScroll = _.throttle((=> @onSuperArticleScroll()), 100)
    @$window.on 'scroll', throttledScroll

  onSuperArticleScroll: ->
    if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

  # Sets up waypoint for both fullscreen video and super article
  setupArticleWaypoints: ->
    $stickyHeader = @$('.article-sa-sticky-header')
    $fullscreenVideo = @$('.article-fullscreen')

    return unless $stickyHeader.length or $fullscreenVideo.length

    selector = if $('body').hasClass('body-fullscreen-article') then '.article-content.article-fullscreen-content' else '.article-section-container:first'
    @$(".article-container[data-id=#{@article.get('id')}] #{selector}").waypoint (direction) =>
      if direction == 'down'
        if @article.get('is_super_article')
          $stickyHeader.addClass 'visible'
        if $fullscreenVideo.length
          $fullscreenVideo.addClass 'hidden'
          @$el.removeClass 'body-transparent-header body-transparent-header-white'
      else
        if @article.get('is_super_article')
          $stickyHeader.removeClass 'visible'
        if $fullscreenVideo.length
          $fullscreenVideo.removeClass 'hidden'
          @$el.addClass 'body-transparent-header body-transparent-header-white'
