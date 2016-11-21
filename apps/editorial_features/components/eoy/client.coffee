_ = require 'underscore'
Backbone = require 'backbone'
SuperArticleView = require '../../../../components/article/client/super_article.coffee'
Article = require '../../../../models/article.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
sd = require('sharify').data

module.exports.EoyView = class EoyView extends Backbone.View

  el: $('body')

  events:
    'click .video-controls': 'playVideo'

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @windowHeight = $(window).scrollTop()
    @setupSliderHeight()
    @getScrollZones()
    @trackDirection()
    @watchWindow()
    @bodyInView()
    @setupCarousel()
    console.log sd.SUPER_ARTICLE
    @article = new Article sd.SUPER_ARTICLE
    new SuperArticleView el: $('body'), article: @article

  watchWindow: =>
    $(window).scroll () =>
      _.debounce @trackDirection(), 50
    $(window).resize () =>
      @setupSliderHeight()

  getScrollZones: =>
    scrollZones = []
    scrollZones.push @firstHeight
    for i in [1..($('.scroller__items section').length - 1)]
      scrollZones.push( (i * @activeHeight) + @firstHeight )
    return scrollZones

  closestSection: (scrollTop) =>
    scrollZones = @getScrollZones()
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length + 1]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  trackDirection: =>
    scrollTop = $(window).scrollTop()
    if scrollTop == 0
      $('.scroller__items section[data-section!="0"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="0"]').attr('data-state', 'open').height(@firstHeight)
    #else if scrollTop > @windowHeight
      #downscrolling
    #else
      #upscrolling
    @doSlider(scrollTop)
    @windowHeight = scrollTop

  setupSliderHeight: =>
    #height of bounding box / title section
    @firstHeight = $(window).height() - 75 - 20
    #height of one section open
    @activeHeight = $(window).height() - 75 - ($(window).height() * .33)
    #bottom scroll border of header content
    @openHeight = @getScrollZones()[10] + 75
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller__items section').first().height(@firstHeight)
    $('.scroller__items section[data-section!="0"][data-state="open"]').css('max-height', @activeHeight)
    $('.scroller').fadeIn(500)
    $('.article-body').fadeIn(500)

  doSlider: (scrollTop) =>
    active = @closestSection(scrollTop)
    $primarySection = $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open')
    nextHeight = @firstHeight - $primarySection.height() - @activeHeight
    diff = @getScrollZones()[active] - scrollTop
    if active < 1
      $primarySection.height(diff)
      if scrollTop < @activeHeight
        $primarySection.next().attr('data-state', 'open').height(scrollTop)
        $primarySection.next().next().attr('data-state', 'closed')
      else
        $primarySection.next().attr('data-state', 'open').height(@activeHeight)
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight)
    else
      $primarySection.prev().attr('data-state', 'closed')
      $primarySection.height(diff)
      if diff + @activeHeight < @firstHeight
        $primarySection.next().attr('data-state', 'open').height(@activeHeight)
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight)
      else
        $primarySection.next().height(@firstHeight - diff)
        $primarySection.next().next().attr('data-state', 'closed')
      if active >= 9
        if this.getScrollZones()[9] < scrollTop
          $('.scroller__items section[data-section!="10"]').attr('data-state', 'closed')
          $('.scroller__items section[data-section="10"]').height(active - scrollTop)

  bodyInView: =>
    @introInView()
    @sectionsInView()
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

  sectionsInView: =>
    for i in [2..$('.article-body--section').length]
      $('.article-body section[data-section="' + i + '"]').waypoint () ->
        $(this).find('.article-body--section').toggleClass('active')
      , {offset: '10%'}
      $('.article-body section[data-section="1"]').waypoint () ->
        $(this).find('.article-body--section').toggleClass('active')
      , {offset: '50%'}
      # draw line down side of first article
      $('.article-body section[data-section="1"] article').waypoint (direction) ->
        $(this).find('.spacer--article').addClass('active')
      , {offset: '50%'}

  playVideo: (e) =>
    $(e.target).toggleClass('active')
    video = $(e.target).prev()
    if video[0].paused
      video[0].play()
    else
      video[0].pause()
    video[0].onended = () ->
      $(e.target).removeClass('active')

  setupCarousel: ->
    initCarousel $('.carousel'), imagesLoaded: true

module.exports.init = ->
  new EoyView