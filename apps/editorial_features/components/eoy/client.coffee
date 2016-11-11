_ = require 'underscore'
Backbone = require 'backbone'

module.exports.EoyView = class EoyView extends Backbone.View

  initialize: ->
    $(window).scrollTop(0)
    $('.scroller__items section').attr('data-state', 'closed')
    @windowHeight = $(window).scrollTop()
    @setupSliderHeight()
    @getScrollZones()
    @trackDirection()
    @watchWindow()
    $('.eoy-feature__content').animate({scrollTop: 0}, 10)
    $('.scroller').fadeIn(500)

  watchWindow: =>
    $(window).scroll () =>
      # _.debounce @doSlider(), 200
      _.debounce @trackDirection(), 200
    $(window).resize () =>
      @setupSliderHeight()

  getScrollZones: =>
    @scrollZones = []
    @scrollZones.push @firstHeight
    for i in [1..($('.scroller__items section').length - 1)]
      @scrollZones.push( (i * @activeHeight) + @firstHeight )
    return @scrollZones

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
    else if scrollTop > @windowHeight
        _.debounce @slideDown(scrollTop), 200
        console.log 'goin down'
    else
        _.debounce @slideUp(scrollTop), 200
        console.log 'goin up'
    @windowHeight = scrollTop

  setupSliderHeight: =>
    #height of bounding box / title section
    @firstHeight = $(window).height() - 75 - 20
    #height of one section open
    @activeHeight = $(window).height() - 75 - ($(window).height() * .33)
    #bottom scroll border of header content
    @openHeight = (($('.scroller__items section').length - 1) * @activeHeight) - 20 - 75 + @firstHeight
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller__items section').first().height(@firstHeight)
    $('.scroller__items section[data-section!="0"][data-state="open"]').css('max-height', @activeHeight)

  slideDown: (scrollTop) =>
    active = @closestSection(scrollTop)
    $primarySection = $('.scroller__items section[data-section="' + active + '"]')
    nextHeight = @firstHeight - $primarySection.height() - @activeHeight
    if active < 1
      $('.scroller__items section').first().attr('data-state', 'open')
      $primarySection.height(@firstHeight - scrollTop)
      if scrollTop < @activeHeight
        $primarySection.next().attr('data-state', 'open').height(scrollTop)
      else
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight)
    else
      diff = @getScrollZones()[active] - scrollTop
      $primarySection.prev().attr('data-state', 'closed')
      $primarySection.height(diff)
      if $primarySection.next().height() < @activeHeight
        $primarySection.next().attr('data-state', 'open').height(@firstHeight - $primarySection.height())
      else
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight)

  slideUp: (scrollTop) =>
    active = @closestSection(scrollTop)
    $primarySection = $('.scroller__items section[data-section="' + active + '"]')
    nextHeight = @firstHeight - $primarySection.height() - @activeHeight
    if active < 1
      $('.scroller__items section').first().attr('data-state', 'open')
      $primarySection.height(@firstHeight - scrollTop)
      if scrollTop < @activeHeight
        $primarySection.next().attr('data-state', 'open').height(scrollTop)
      else
        $primarySection.next().next().attr('data-state', 'open').height(nextHeight)
    else
      diff = @getScrollZones()[active] - scrollTop
      $primarySection.height(diff)
      if $primarySection.next().next().attr('data-state', 'open')
        $primarySection.next().next().height(nextHeight)
      if $primarySection.height() < @activeHeight
        $primarySection.height(@firstHeight - $primarySection.height() - nextHeight)
      # else
        # debugger
        # $primarySection.prev().attr('data-state', 'open').height(nextHeight)
      # $primarySection.next().attr('data-state', 'closed')
      # if $primarySection.prev().height() < @activeHeight
      #   debugger
      #   $primarySection.prev().attr('data-state', 'open').height(@firstHeight - $primarySection.height())
      # else
      #   debugger
      #   $primarySection.next().next().attr('data-state', 'open').height(nextHeight)


module.exports.init = ->
  new EoyView