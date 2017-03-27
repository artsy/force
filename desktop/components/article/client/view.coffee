_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
CurrentUser = require '../../../models/current_user.coffee'
Article = require '../../../models/article.coffee'
Artist = require '../../../models/artist.coffee'
Articles = require '../../../collections/articles.coffee'
ShareView = require '../../share/view.coffee'
CTABarView = require '../../cta_bar/view.coffee'
ImageSetView = require './image_set.coffee'
SuperArticleView = require './super_article.coffee'
FullscreenView = require './fullscreen.coffee'
modalize = require '../../modalize/index.coffee'
{ Following, FollowButton } = require '../../follow_button/index.coffee'
initCarousel = require '../../merry_go_round/bottom_nav_mgr.coffee'
Q = require 'bluebird-q'
{ crop } = require '../../resizer/index.coffee'
blurb = require '../../gradient_blurb/index.coffee'
Sticky = require '../../sticky/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
JumpView = require '../../jump/view.coffee'
editTemplate = -> require('../templates/edit.jade') arguments...
relatedTemplate = -> require('../templates/related.jade') arguments...
calloutTemplate = -> require('../templates/callout.jade') arguments...

DATA =
  sort: '-published_at'
  published: true
  tier: 1
  channel_id: sd.ARTSY_EDITORIAL_CHANNEL

module.exports = class ArticleView extends Backbone.View

  events:
    'click .articles-section-right-chevron, \
    .articles-section-left-chevron': 'toggleSectionCarousel'
    'click .article-video-play-button': 'playVideo'
    'click .article-section-image-set__remaining, .article-section-image-set__image-container': 'toggleModal'
    'click .article-section-toc-link a': 'jumpSmooth'

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @following = new Following(null, kind: 'artist') if @user?
    { @article, @gradient, @waypointUrls, @seenArticleIds, @lushSignup } = options
    new ShareView el: @$('.article-social')
    new ShareView el: @$('.article-share-fixed')
    @loadedArtworks = @loadedImageHeights = false
    @sticky = new Sticky
    @jump = new JumpView
    @previousHref = options.previousHref
    @windowWidth = $(window).width()
    @windowHeight = $(window).height()
    @$articleContainer = $(".article-container[data-id=#{@article.get('id')}] .article-content")

    # Render sections
    @renderSlideshow()
    @resizeImages(@doneResizingImages)
    @setupFooterArticles()
    @setupStickyShare()
    @setupMobileShare()
    @setupFollowButtons()
    @setupImageSets()
    @resetImageSetPreview()
    if @article.attributes.channel?.id == sd.GALLERY_INSIGHTS_CHANNEL
      @setupMarketoStyles()
    @renderCalloutSections()

    # Resizing
    @sizeVideo()
    @embedMobileHeight()
    $(window).resize(_.debounce(@refreshWindowSize, 100))
    @$('.article-section-container a:not(.artist-follow, .is-jump-link)').attr('target', '_blank')
    # FS and Super Article setup
    if ($header = @$('.article-fullscreen')).length
      new FullscreenView el: @$el, article: @article, header: $header
    if sd.SUPER_SUB_ARTICLES?.length > 0
      new SuperArticleView el: @$el, article: @article

    # Utility
    @checkEditable()

  maybeFinishedLoading: ->
    if @loadedArtworks and @loadedCallouts and not @loadedImageHeights
      @setupMaxImageHeights()
    else if @loadedArtworks and @loadedCallouts and @loadedImageHeights
      @addReadMore() if @gradient
      @setupWaypointUrls() if @waypointUrls and not @gradient

  renderSlideshow: =>
    initCarousel @$('.js-article-carousel'), imagesLoaded: true

  embedMobileHeight: =>
    $('.article-section-container[data-section-type=embed]').each (i, embed) =>
      mHeight = $(embed).find('iframe').data('m-height')
      dHeight = $(embed).find('iframe').data('d-height')
      if @windowWidth < 550
        $(embed).find('iframe').height(mHeight)
      else
        $(embed).find('iframe').height(dHeight)

  setupFollowButtons: ->
    @artists = []
    @$('.artist-follow').each (i, artist) =>
      @artists.push id: $(artist).data('id')
    @followButtons = @artists.map (artist) =>
      artist = new Artist id: artist.id
      new FollowButton
        el: @$(".artist-follow[data-id='#{artist.id}']")
        following: @following
        modelName: 'artist'
        model: artist
        context_page: "Article page"
        context_module: 'article_artist_follow'
        href: sd.APP_URL + sd.CURRENT_PATH
    @following.syncFollows(_.pluck @artists, 'id') if @user?

  setupImageSets: ->
    # Slideshow Preview
    $container = $('.article-section-container[data-section-type="image_set"]')
    $($container).each (i, value) ->
      imagesLoaded $(value), =>
        allowedPixels = 580.0 - 120 # min-width + margins
        totalPixels = 0.0
        $(value).find('img').each (i, img) ->
          totalPixels = totalPixels + img.width
          return false if totalPixels > allowedPixels
          $(img).parent('.article-section-image-set__image-container').css('display', 'inline-block')

  toggleModal: (e) ->
    # Slideshow Modal
    $current = $(e.currentTarget)
    $parent = $($current).closest('.article-section-image-set')
    if _.contains e.currentTarget.classList, "article-section-image-set__remaining"
      startIndex = 0
    else
      startIndex = $($current).data('index')
    section = @article.get('sections')[$($parent).data('index')]
    imageSet = new ImageSetView
      items: section.images
      user: @user
      startIndex: startIndex
    @modal = modalize imageSet,
      dimensions: width: '100vw', height: '100vh'
    @modal.view.$el.addClass 'image-set-container'
    @modal.open()

  jumpSmooth: (e) ->
    e.preventDefault()
    name = $(e.currentTarget).attr('href').substring(1)
    @jump.scrollToPosition @$(".is-jump-link[name=#{name}]").offset().top

  resizeImages: (cb=->) =>
    imageSections = $('.article-section-image-collection ul')
    for section in imageSections
      $el = $(section)
      if $el.children().length < 2 or $el.closest('.article-section-image-collection').data('layout') is 'column_width'
        $el.addClass('portrait') if $el.find('img').width() < $el.find('img').height()
        $el.addClass('single') if $el.children().length is 1
        @setupMaxImageHeights $el
      else
        Q.nfcall @fillwidth, $el
    cb()

  doneResizingImages: =>
    @loadedImageHeights = true
    @loadedArtworks = true
    @maybeFinishedLoading()

  setupMaxImageHeights: (el) ->
    $(el).find('img')
      .each (i, img) ->
        $(img).parent().css('max-width', '')
        optimizedHeight = window.innerHeight * 0.9
        newWidth = ((img.width * optimizedHeight) / img.height)
        if newWidth < 580 and !$(img).closest('ul').hasClass('portrait')
          $(img).closest('li').css('max-width', 580)
        else
          $(img).closest('li').css('max-width', newWidth)
    $(el).closest('.article-section-image-collection').addClass 'images-loaded'

  fillwidth: (el) =>
    if @windowWidth < 550
      @removeFillwidth el
      @setupMaxImageHeights el
    else
      $list = $(el)
      if @windowHeight > 700
        newHeight = @windowHeight * .8
      $list.fillwidthLite
        gutterSize: 30
        targetHeight: newHeight || 600
        apply: (img) ->
          img.$el.closest('li').width(img.width)
        done: (imgs) =>
          # Make sure the captions line up in case rounding off skewed things
          tallest = _.max _.map imgs, (img) -> img.height
          $list.find('.artwork-item-image-container').each -> $(this).height tallest
          # Account for screens that are both wide & short
          if !@imgsFillContainer(imgs, $list, 30).isFilled
            $list.css({'display':'flex', 'justify-content':'center'})
          # Remove loading state
          $list.closest('.article-section-image-collection').addClass 'images-loaded'


  imgsFillContainer: (imgs, $container, gutter) =>
    getWidth = _.map imgs, (img) -> img.width
    imgsWidth = _.reduce(getWidth, (a, b) ->
                return a + b
              , 0) + (($container.children().length - 1) * gutter)
    isFilled = $container.width() - 15 < imgsWidth
    return {imgsWidth: imgsWidth, isFilled: isFilled}

  removeFillwidth: (imgs) ->
    $(imgs).find('li').css({'width' : '', 'max-width' : ''})
    $(imgs).find('.artwork-item-image-container').css('height', '')

  refreshWindowSize: =>
    @windowWidth = $(window).width()
    @windowHeight = $(window).height()
    @resizeImages()
    @resetImageSetPreview()
    @embedMobileHeight()
    @addReadMore() if @gradient

  resetImageSetPreview: =>
    $('.article-section-image-set__images').each (i, container) =>
      $(container).each (i, imgs) =>
        if @windowWidth < 620
          targetHeight = 225
          $(imgs).fillwidthLite
            gutterSize: 5
            targetHeight: targetHeight
            apply: (img) ->
              img.$el.parent().width(img.width).height(img.height)
            done: (imgs) =>
              $container = imgs[0].$el.closest('.article-section-image-set__images')
              imgsWidth = @imgsFillContainer(imgs, $container, 5).imgsWidth
        else
          $(imgs).children().each (i, img)->
            $(img).css({'width':'auto', 'height':'150px'})

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

  sizeVideo: =>
    $videos = @$("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']")

    resizeVideo = ->
      newHeight = @windowheight - 100
      $videos.each ->
        $el = $(this)
        $parent = $el.parent()
        parentWidth = $parent.outerWidth()
        parentHeight = $parent.outerHeight()
        maxHeight = if (newHeight < parentHeight) then newHeight else (parentWidth * .5625)
        $($parent).height(maxHeight)

    $(window).resize(_.debounce(resizeVideo, 100))
    resizeVideo()

  setupStickyShare: ->
    @fadeInShare = _.once -> @$(".article-share-fixed[data-id=#{@article.get('id')}]").fadeTo(250, 1)
    @sticky.add @$(".article-share-fixed[data-id=#{@article.get('id')}]")
    $(@$el).waypoint (direction) =>
      @fadeInShare() if direction is 'down' and @windowWidth > 900

  setupMobileShare: ->
    $(".article-container[data-id=#{@article.id}]").waypoint (direction) =>
      if @windowWidth < 900
        if direction is 'down'
          $(this.$el).find('.article-social').addClass('fixed').fadeIn(250)
        else
          $(this.$el).find('.article-social').removeClass('fixed').fadeOut(250)
      else
        $('.article-social').show()
    , { offset: 450 }

    $(".article-container[data-id=#{@article.id}]").waypoint (direction) =>
      if @windowWidth < 900
        if direction is 'down'
          $(this.$el).find('.article-social').fadeOut(250)
        if direction is 'up'
          $(this.$el).find('.article-social').addClass('fixed').fadeIn(250)
      else
        $('.article-social').show()
    , { offset: 'bottom-in-view' }

  setupMarketoStyles: =>
    $(@$el).waypoint (direction) =>
      if direction is 'down'
        @$('.mktoFieldWrap input').attr('placeholder', 'Enter your email address')

  setupFooterArticles: =>
    # Do not render footer articles if the article has related articles (is/is in a super article)
    if sd.SCROLL_ARTICLE is 'infinite' and sd.SUPER_SUB_ARTICLES?.length < 1 and not @lushSignup
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
    if @windowWidth > 550
      maxTextHeight = 405 # line-height * line-count
    else
      maxTextHeight = 500
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
              @setupMobileShare()
            onClick: =>
              @sticky.rebuild()
              $.waypoints 'refresh'
              @setupMobileShare()
              analyticsHooks.trigger 'readmore', {urlref: @previousHref || ''}
          break

  setupWaypointUrls: =>
    editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
    @$container = $(".article-container[data-id=#{@article.get('id')}] .article-content")
    $(@$container).waypoint (direction) =>
      if direction is 'down'
        # Set the pageview
        window.history.replaceState {}, @article.get('id'), @article.href()
        # Update Edit button
        $('.article-edit-container a').attr 'href', editUrl
    $(@$container).waypoint (direction) =>
      if direction is 'up'
        # Setup the pageview
        window.history.replaceState {}, @article.get('id'), @article.href()
        # Update Edit button
        $('.article-edit-container a').attr 'href', editUrl
    , { offset: 'bottom-in-view' }

  renderCalloutSections: =>
    calloutSections = _.filter @article.get('sections'), (section) -> section.type is 'callout'
    ids = _.pluck(calloutSections, 'article')

    if sd.ARTICLE?.id is @article.get('id') or not ids.length
      @loadedCallouts = true
      @maybeFinishedLoading()
      return

    new Articles().fetch
      data: ids: ids
      success: (articles) =>
        for section in calloutSections
          if section.article
            @$articleContainer.find(".article-section-callout[data-id=#{section.article}]").html calloutTemplate
              section: section
              calloutArticles: articles
              crop: crop
        @loadedCallouts = true
        @maybeFinishedLoading()
