_ = require 'underscore'
Backbone = require 'backbone'
SuperArticleView = require '../../../../components/article/client/super_article.coffee'
Article = require '../../../../models/article.coffee'
Curation = require '../../../../models/curation.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
bodyView = -> require('./templates/body.jade') arguments...
sd = require('sharify').data
markdown = require '../../../../components/util/markdown.coffee'
Q = require 'bluebird-q'

module.exports.EoyView = class EoyView extends Backbone.View

  el: $('body')

  events:
    'click .video-controls': 'playVideo'

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @curation = new Curation sd.CURATION
    @windowPosition = $(window).scrollTop()
    @setupSliderHeight()
    @loadBody = _.once @deferredLoadBody
    @trackDirection()
    @watchWindow()
    @article = new Article sd.SUPER_ARTICLE
    new SuperArticleView el: $('body'), article: @article

  watchWindow: =>
    $(window).scroll () =>
      @trackDirection()
    $(window).resize () =>
      @setupSliderHeight()
      $.waypoints('refresh')

  getScrollZones: =>
    scrollZones = []
    scrollZones.push @containerHeight
    for i in [1..($('.scroller__items section').length - 1)]
      scrollZones.push( (i * @activeHeight) + @containerHeight )
    return scrollZones

  closestSection: (scrollTop, scrollZones) =>
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length + 1]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  trackDirection: =>
    scrollTop = $(window).scrollTop()
    if scrollTop == 0
      $('.scroller__items section[data-section!="0"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="0"]').attr('data-state', 'open').height(@containerHeight)
    #else if scrollTop > @windowPosition
      #downscrolling
    #else
      #upscrolling
    @doSlider(scrollTop)
    if scrollTop >= @getScrollZones()[6]
      @loadBody()
      @animateBody(scrollTop)
    @windowPosition = scrollTop

  setupSliderHeight: =>
    #height of bounding box / title section
    @containerHeight = $(window).height() - 75 - 20
    #height of one section open
    @activeHeight = $(window).height() - 75 - ($(window).height() * .33)
    #bottom scroll border of header content
    @openHeight = @getScrollZones()[10] + 75
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller__items section').first().height(@containerHeight)
    $('.scroller__items section[data-section!="0"][data-state="open"]').css('max-height', @activeHeight)
    $('.scroller').height(@containerHeight).fadeIn(500)
    $('.article-body').fadeIn(500)

  doSlider: (scrollTop) =>
    scrollZones = @getScrollZones()
    active = @closestSection(scrollTop, scrollZones)
    $primarySection = $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open')
    nextHeight = @containerHeight - $primarySection.height() - @activeHeight
    diff = @getScrollZones()[active] - scrollTop
    if active < 1
      $primarySection.height(diff).removeClass('bottom')
      if scrollTop < @activeHeight
        $primarySection.next().attr('data-state', 'open').height(scrollTop).addClass('bottom')
        $primarySection.next().next().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      else
        $primarySection.next().attr('data-state', 'open').height(@activeHeight).removeClass('bottom')
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight).addClass('bottom')
    else
      $primarySection.prev().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      $primarySection.height(diff).removeClass('bottom')
      if diff + @activeHeight < @containerHeight
        $primarySection.next().attr('data-state', 'open').height(@activeHeight).removeClass('bottom')
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight).addClass('bottom')
      else
        $primarySection.next().height(@containerHeight - diff).attr('data-state', 'open').addClass('bottom')
        $primarySection.next().next().attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
      if active >= 9
        if this.getScrollZones()[9] < scrollTop
          $('.scroller__items section[data-section!="10"]').attr('data-state', 'closed').removeAttr('style').removeClass('bottom')
          $('.scroller__items section[data-section="10"]').height(active - scrollTop).attr('data-state', 'open').addClass('bottom')


  deferredLoadBody: =>
    $('.article-body__content').append bodyView
      curation: @curation
      markdown: markdown
    @bodyInView()
    @introInView()
    @firstSectionInView()
    $('.article-body__content').imagesLoaded () =>
      @sectionsInView()
      @setupCarousel()

  bodyInView: =>
    $('.article-body').waypoint (direction) ->
      if direction is 'up'
        $('.article-body__intro-inner').removeClass('active')
      if direction is 'down'
        $('.article-body__intro-inner').addClass('active')

  introInView: =>
    $('.article-body__intro').waypoint (direction) ->
      if direction is 'up'
        $('.article-body__intro-header').removeClass('active')
      if direction is 'down'
        $('.article-body__intro-header').addClass('active')
    , {offset: '100%'}

  firstSectionInView: =>
    $('.article-body section[data-section="1"]').waypoint () ->
      $(this).find('.article-body--section').toggleClass('active')
      $('.eoy-feature__background').toggleClass('active')
      $(this).find('video').next().addClass('active')
    , {offset: '40%'}

    $('.article-body section[data-section="1"] article').waypoint (direction) ->
      $(this).find('.spacer--article').toggleClass('active')
      # auto play video
      if direction is 'down'
        $(this).find('video')[0].play()
        $(this).find('video')[0].onended = () ->
          $(this).find('video').next().removeClass('active')
    , {offset: '50%'}

  sectionsInView: =>
    for i in [2..$('.article-body--section').length]
      if i < 4
        $('.article-body section[data-section="' + i + '"]').waypoint () ->
          $(this).find('.article-body--section').toggleClass('active')
        , {offset: '25%'}
      else
        $('.article-body section[data-section="' + i + '"]').waypoint () ->
          $(this).find('.article-body--section').toggleClass('active')
        , {offset: '55%'}
    # draw line through center of fourth article
    $('.article-body section[data-section="4"] article').waypoint (direction) ->
      $(this).find('.article-body--section__sub-text .spacer').toggleClass('active')
    , {offset: '60%'}

  animateBody: (scrollTop) =>
    boundaries = @getBodySectionBoundaries()
    active = @closestSection(scrollTop, boundaries.top)
    console.log active
    if active == 1
      $('.article-body section[data-section="' + active + '"] spacer').first()
      debugger

  playVideo: (e) =>
    $(e.target).toggleClass('active')
    video = $(e.target).prev()
    if video[0].paused
      video[0].play()
    else
      video[0].pause()
    video[0].onended = () ->
      $(e.target).removeClass('active')

  getBodySectionBoundaries: () =>
    sectionBoundaries = []
    sectionTopBoundaries = []
    for section in $('.article-body section[data-section!="0"]')
      top = $(section).position().top
      bottom = top + $(section).height()
      left = $(section).position().left
      right = left + $(section).width()
      sectionBoundaries.push {top: top, bottom: bottom, left: left, right: right}
      sectionTopBoundaries.push top - $(window).height() + 400
    return { boundaries: sectionBoundaries, top: sectionTopBoundaries }

  setupCarousel: ->
    initCarousel $('.carousel'), imagesLoaded: true

module.exports.init = ->
  new EoyView