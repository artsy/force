_ = require 'underscore'
Backbone = require 'backbone'
SuperArticleView = require '../../../../components/article/client/super_article.coffee'
Article = require '../../../../models/article'
Curation = require '../../../../models/curation'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
bodyView = -> require('./templates/body.jade') arguments...
sd = require('sharify').data
markdown = require '../../../../components/util/markdown.coffee'
{ resize, crop } = require '../../../../components/resizer/index.coffee'

module.exports.EoyView = class EoyView extends Backbone.View

  el: $('body')

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @curation = new Curation sd.CURATION
    @windowPosition = $(window).scrollTop()
    @windowHeight = $(window).height()
    @headerHeight = if sd.IS_MOBILE then 0 else 55
    @setupSliderHeight()
    @watchWindow()
    @article = new Article sd.SUPER_ARTICLE
    new SuperArticleView el: $('body'), article: @article
    @loadBody = _.once @deferredLoadBody
    @watchScrolling()
    $('.scroller__items section[data-section="0"]').on 'click', @hintScroll
    $('.scroller').fadeIn 500, =>
      @loadBody()
      @smoothAnchorScroll()
      @setupVideos()
      @autoScroll() if !sd.IS_MOBILE
      $('.video').on 'loadedmetadata', @videoControls
      $('.video-controls, video-play-button').on 'click', @playVideo
      @boundaries = @getBodySectionTopBoundaries()
      @animateBody($(window).scrollTop())

  watchWindow: =>
    watchScrolling = _.throttle(@watchScrolling, 25)
    $(window).scroll =>
      if $(window).scrollTop() != @windowPosition
        watchScrolling()
    $(window).resize =>
      @videoControls()
      @setupSliderHeight()
      @boundaries = @getBodySectionTopBoundaries()
      @windowHeight = $(window).height()
      $.waypoints('refresh')
      watchScrolling()

  getScrollZones: =>
    scrollZones = []
    scrollZones.push @containerHeight
    for i in [1..11]
      scrollZones.push( (i * @activeHeight) + @containerHeight + 20)
    return scrollZones

  closestSection: (scrollTop, scrollZones) =>
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  autoScroll: =>
    if @windowPosition < @openHeight
      window.scrollBy(0,1)
      scrolldelay = setTimeout(@autoScroll,25)

  watchScrolling: =>
    scrollTop = $(window).scrollTop()
    scrollTop = Math.round(scrollTop)
    if scrollTop == 0
      $('.scroller__items section[data-section!="0"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="0"]').attr('data-state', 'open').height(@containerHeight)
    if scrollTop <= @openHeight
      @doSlider(scrollTop)
    if scrollTop >= @getScrollZones()[11]
      @animateBody(scrollTop)
    @windowPosition = scrollTop

  setupSliderHeight: =>
    #height of bounding box / title section
    @containerHeight = @windowHeight - @headerHeight
    #height of one section open
    @activeHeight = @windowHeight - @headerHeight - (@windowHeight * .33)
    #bottom scroll border of header content
    @openHeight = @getScrollZones()[11] + 55
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller__items section').first().height(@containerHeight)
    $('.scroller__items section[data-section!="0"][data-state="open"]').css('max-height', @activeHeight)
    $('.scroller').height(@containerHeight)
    $('.article-body').fadeIn(500)

  doSlider: (scrollTop) =>
    scrollZones = @getScrollZones()
    active = @closestSection(scrollTop, scrollZones)
    $active = $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open')
    nextHeight = @containerHeight - $active.height() - @activeHeight
    diff = @getScrollZones()[active] - scrollTop
    if active < 1
      $active.height(diff - 20).removeClass('bottom')
      if scrollTop < @activeHeight
        $active.next().attr('data-state', 'open').height(scrollTop).addClass('bottom')
        $active.next().next().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      else
        $active.next().attr('data-state', 'open').height(@activeHeight).removeClass('bottom')
        $active.next().next().attr('data-state', 'open').height(nextHeight).addClass('bottom')
    else
      $active.prev().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      $active.height(diff).removeClass('bottom')
      if diff + @activeHeight < @containerHeight
        $active.next().attr('data-state', 'open').height(@activeHeight).removeClass('bottom')
        $active.next().next().attr('data-state', 'open').height(nextHeight).addClass('bottom')
      else
        $active.next().height(@containerHeight - diff).attr('data-state', 'open').addClass('bottom')
        $active.next().next().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      if active >= 10
        if this.getScrollZones()[10] < scrollTop
          $('.scroller__items section[data-section!="11"]').attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
          $('.scroller__items section[data-section="11"]').height(active - scrollTop).attr('data-state', 'open').addClass('bottom')

  deferredLoadBody: =>
    $('.article-body').prepend bodyView
      curation: @curation
      article: @article
      markdown: markdown
      url: sd.APP_URL
      resize: resize
      crop: crop
    @bodyInView()
    $('.article-body').imagesLoaded () =>
      @setupCarousel()
      @boundaries = @getBodySectionTopBoundaries()

  bodyInView: ->
    $('.article-body').waypoint (direction) ->
      if direction is 'down'
        $('.article-body section[data-section="1"]').addClass('active')
    , {offset: '50%'}

    $('.article-body').waypoint (direction) ->
      if direction is 'up'
        $('.article-body__intro').removeClass('active')
        $('.article-body section.active').removeClass('active')
      if direction is 'down'
        $('.article-body__intro').addClass('active')
    , {offset: '100%'}

    $('.article-body').waypoint (direction) ->
      $('.eoy-feature__background').toggleClass('active')
      $('.scroller').toggleClass('active')
    , {offset: '0'}

  animateBody: (scrollTop) =>
    active = @closestSection(scrollTop, @boundaries) - 1
    if active > 9
      active = 10
    $('.article-body section[data-section="' + active + '"]').addClass('active')

  getBodySectionTopBoundaries: =>
    boundaries = []
    for section, i in $('.article-body section')
      top = $(section).position().top
      if i < 1
        boundaries.push top - @windowHeight - 400
      else if $(window).width() > 550
        boundaries.push top - @windowHeight + 300
      else
        boundaries.push top - @windowHeight + 150
    return boundaries

  setupCarousel: ->
    initCarousel $('.carousel'),
      imagesLoaded: true
      advanceBy: 1
      wrapAround: true

  setupVideos: =>
    for video in $('.article-body__content .video-controls')
      active = $(video).closest('section').data('section')
      playVideo = @playVideo
      $(".article-body section[data-section='" + active + "'] .video-controls").waypoint (direction) ->
        if direction is 'down'
          playVideo this
      , {offset: '100%'}

  videoControls: =>
    for videoControls in $('.article-body__content .video-controls')
      video = $(videoControls).prev('video')
      $(videoControls).width(video.width()).height(video.height())

  playVideo: (e) =>
    if e.target
      if $(e.target).hasClass('video-play-button')
        e = $(e.target).parent()
      else
        e = e.target
    video = $(e).prev()
    if video[0].paused
      $(e).addClass('active')
      video[0].play()
    else
      video[0].pause()
      $(e).removeClass('active')
    video[0].onended = () ->
      $(e).removeClass('active')

  hintScroll: =>
    if @windowPosition == 0
      $('html, body').animate({
        scrollTop: @activeHeight
        }, 1000)

  smoothAnchorScroll: =>
    $('.scroller a[href*="#"]:not([href="#"])').click (e) ->
      e.preventDefault()
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
        target = this.hash.slice(1)
        target = $('[name=' + target + ']')
        if target.length
          $('html, body').animate({
            scrollTop: target.offset().top - 100
            }, 2500)

module.exports.init = ->
  new EoyView
