_ = require 'underscore'
Backbone = require 'backbone'
SuperArticleView = require '../../../../components/article/client/super_article.coffee'
Article = require '../../../../models/article.coffee'
Curation = require '../../../../models/curation.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
bodyView = -> require('./templates/body.jade') arguments...
sd = require('sharify').data
markdown = require '../../../../components/util/markdown.coffee'
{ resize } = require '../../../../components/resizer/index.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'

module.exports.EoyView = class EoyView extends Backbone.View

  el: $('body')
  events:
    'click .video-controls': 'playVideo'
    'click .scroller__items section[data-section="0"]': 'hintScroll'
    'loadedmetadata .video': 'videoControls'

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @curation = new Curation sd.CURATION
    @windowPosition = $(window).scrollTop()
    @windowHeight = $(window).height()
    @setupSliderHeight()
    @trackScrollIntoBody = _.once @trackScroll
    @watchWindow()
    @article = new Article sd.SUPER_ARTICLE
    new SuperArticleView el: $('body'), article: @article
    @loadBody = _.once @deferredLoadBody
    @watchScrolling()
    $('.scroller').fadeIn 500, =>
      @loadBody()
      @smoothAnchorScroll()
      @setupVideos()
      @boundaries = @getBodySectionTopBoundaries()
      @animateBody($(window).scrollTop())

  watchWindow: =>
    watchScrolling = _.throttle(@watchScrolling, 30)
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
    for i in [1..10]
      scrollZones.push( (i * @activeHeight) + @containerHeight )
    return scrollZones

  closestSection: (scrollTop, scrollZones) =>
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length + 1]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  watchScrolling: =>
    scrollTop = $(window).scrollTop()
    scrollTop = Math.round(scrollTop)
    if scrollTop == 0
      $('.scroller__items section[data-section!="0"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="0"]').attr('data-state', 'open').height(@containerHeight)
    if scrollTop <= @openHeight
      @doSlider(scrollTop)
    if scrollTop >= @getScrollZones()[10]
      @animateBody(scrollTop)
    @windowPosition = scrollTop

  setupSliderHeight: =>
    #height of bounding box / title section
    @containerHeight = @windowHeight - 75 - 20
    #height of one section open
    @activeHeight = @windowHeight - 75 - (@windowHeight * .33)
    #bottom scroll border of header content
    @openHeight = @getScrollZones()[10] + 75
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller__items section').first().height(@containerHeight)
    $('.scroller__items section[data-section!="0"][data-state="open"]').css('max-height', @activeHeight)
    $('.scroller').height(@containerHeight + 20)
    $('.article-body').fadeIn(500)

  doSlider: (scrollTop) =>
    scrollZones = @getScrollZones()
    active = @closestSection(scrollTop, scrollZones)
    $active = $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open')
    nextHeight = @containerHeight + 20 - $active.height() - @activeHeight
    diff = @getScrollZones()[active] - scrollTop
    if active < 1
      $active.height(diff).removeClass('bottom')
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
      if active >= 9
        if this.getScrollZones()[9] < scrollTop
          $('.scroller__items section[data-section!="10"]').attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
          $('.scroller__items section[data-section="10"]').height(active - scrollTop).attr('data-state', 'open').addClass('bottom')

  deferredLoadBody: =>
    $('.article-body').prepend bodyView
      curation: @curation
      markdown: markdown
      resize: resize
    @bodyInView()
    $('.article-body').imagesLoaded () =>
      @setupCarousel()
      @boundaries = @getBodySectionTopBoundaries()

  bodyInView: =>
    $('.article-body').waypoint (direction) =>
      if direction is 'up'
        $('.article-body__intro-inner').removeClass('active')
      if direction is 'down'
        $('.article-body__intro-inner').addClass('active')
        @trackScrollIntoBody()
    , {offset: '50%'}

    $('.article-body').waypoint (direction) ->
      if direction is 'up'
        $('.article-body__intro').removeClass('active')
      if direction is 'down'
        $('.article-body__intro').addClass('active')
    , {offset: '100%'}

    $('.article-body').waypoint (direction) ->
      $('.eoy-feature__background').toggleClass('active')
      $('.scroller').toggleClass('active')
      if direction is 'up'
        $('.article-body section.active').removeClass('active')
    , {offset: '0'}

  animateBody: (scrollTop) =>
    active = @closestSection(scrollTop, @boundaries) - 1
    $('.article-body section[data-section="' + active + '"]').addClass('active')

  getBodySectionTopBoundaries: =>
    boundaries = []
    for section, i in $('.article-body section')
      top = $(section).position().top
      if i < 1
        boundaries.push top - @windowHeight
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
    # @videoControls()
    for video in $('.article-body__content .video-controls')
      active = $(video).closest('section').data('section')
      playVideo = @playVideo
      $(".article-body section[data-section='" + active + "'] .video-controls").waypoint (direction) ->
        if direction is 'down'
          playVideo this
      , {offset: '100%'}

  videoControls: =>
    debugger
    for videoControls in $('.article-body__content .video-controls')
      video = $(videoControls).prev('video')
      $(videoControls).width(video.width()).height(video.height())

  playVideo: (e) =>
    if e.target
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
    $('.scroller a[href*=#]:not([href=#])').click (e) ->
      e.preventDefault()
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
        target = this.hash.slice(1)
        target = $('[name=' + target + ']')
        if target.length
          $('html, body').animate({
            scrollTop: target.offset().top - 100
            }, 2500)

  trackScroll: ->
    analyticsHooks.trigger 'scroll:sa-body'

module.exports.init = ->
  new EoyView