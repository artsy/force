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

Q = require 'bluebird-q'

module.exports.EoyView = class EoyView extends Backbone.View

  el: $('body')
  events:
    'click .video-controls': 'playVideo'

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @curation = new Curation sd.CURATION
    @windowPosition = window.scrollY
    @windowHeight = $(window).height()
    @setupSliderHeight()
    @loadBody = _.once @deferredLoadBody
    @watchScrolling()
    @watchWindow()
    @article = new Article sd.SUPER_ARTICLE
    new SuperArticleView el: $('body'), article: @article

  watchWindow: =>
    $(window).scroll () =>
      if window.scrollY != @windowPosition
        watchScrolling = _.throttle(@watchScrolling, 30)
        watchScrolling()
    $(window).resize () =>
      @setupSliderHeight()
      @windowHeight = $(window).height()
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

  watchScrolling: =>
    scrollTop = window.scrollY
    scrollTop = Math.round(scrollTop)
    if scrollTop == 0
      $('.scroller__items section[data-section!="0"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="0"]').attr('data-state', 'open').height(@containerHeight)
    if scrollTop <= @openHeight
      @doSlider(scrollTop)
    if scrollTop >= @getScrollZones()[6]
      @loadBody()
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
    $('.scroller').height(@containerHeight).fadeIn(500)
    $('.article-body').fadeIn(500)

  doSlider: (scrollTop) =>
    scrollZones = @getScrollZones()
    active = @closestSection(scrollTop, scrollZones)
    $active = $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open')
    nextHeight = @containerHeight - $active.height() - @activeHeight
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
    @bodyInView()
    @firstSectionInView()
    @setImages()
    $('.article-body').imagesLoaded () =>
      @setupCarousel()
      @boundaries = @getBodySectionTopBoundaries()

  bodyInView: =>
    $('.article-body').waypoint (direction) ->
      if direction is 'up'
        $('.article-body__intro-inner').removeClass('active')
      if direction is 'down'
        $('.article-body__intro-inner').addClass('active')
    , {offset: '50%'}

  firstSectionInView: =>
    $('.article-body section[data-section="1"]').waypoint () ->
      $('.eoy-feature__background').toggleClass('active')
    , {offset: '40%'}

    $('.article-body section[data-section="1"] article').waypoint (direction) ->
      $(this).find('video').next().addClass('active')
      if direction is 'down'
        $(this).find('video')[0].play()
        $(this).find('video')[0].onended = () ->
          $(this).find('video').next().removeClass('active')
    , {offset: '50%'}

  animateBody: (scrollTop) =>
    active = @closestSection(scrollTop, @boundaries) - 1
    $('.article-body section[data-section!="' + active + '"]').removeClass('active')
    $('.article-body section[data-section="' + active + '"]').addClass('active')

  playVideo: (e) =>
    $(e.target).toggleClass('active')
    video = $(e.target).prev()
    if video[0].paused
      video[0].play()
    else
      video[0].pause()
    video[0].onended = () ->
      $(e.target).removeClass('active')

  getBodySectionTopBoundaries: () =>
    sectionTops = []
    for section, i in $('.article-body section')
      top = $(section).position().top
      if i < 1
        sectionTops.push top - @windowHeight
      else
        sectionTops.push top - @windowHeight + 400
    return sectionTops

  setupCarousel: ->
    initCarousel $('.carousel'), imagesLoaded: true

  setImage: ->
    $img = $(this)
    src = $img.attr 'src'
    if src != ''
      width = 800
      src = resize(src, width: width * (window.devicePixelRatio or 1))
      $img.attr 'src', src

  setImages: ->
    $('.article-body__content img').each @setImage

module.exports.init = ->
  new EoyView