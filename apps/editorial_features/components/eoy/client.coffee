_ = require 'underscore'
Backbone = require 'backbone'

module.exports.EoyView = class EoyView extends Backbone.View

  initialize: ->
    $('.scroller__items section').attr('data-state', 'closed')
    @setupSliderHeight()
    @getScrollZones()
    @buildSlinkyBg()
    @doSlider()
    @watchWindow()
    $('.scroller').fadeIn(500)

  watchWindow: =>
    $(window).scroll () =>
      @doSlider()
    $(window).resize () =>
      @setupSliderHeight()

  getScrollZones: =>
    @scrollZones = []
    for i in [0..$('section').length]
      @scrollZones.push( (i + 1) * @activeHeight )
    return @scrollZones

  closestSection: (scrollTop) =>
    scrollZones = @getScrollZones()
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length + 1]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  setupSliderHeight: =>
    #height of one section open
    @activeHeight = $(window).height() - 75 - 20
    #bottom scroll border of slinky content
    @openHeight = (($('section').length - 1) * @activeHeight) - 75
    $('.eoy-feature__content').height(@openHeight)
    $('.scroller_items section').first().find('.inner .left').height(@activeHeight)

  buildSlinkyBg: =>
    elementCount = Math.round(@activeHeight / 30)
    _(elementCount).times () =>
      $('.slinky').each (i, slinky) =>
        $(slinky).append('<div class="spacer" />')

  doSlider: =>
    scrollTop = $(window).scrollTop()
    active = @closestSection(scrollTop)
    @revealBody(scrollTop)
    if scrollTop == 0
      $('.scroller__items section[data-section!="' + active + '"]').attr('data-state', 'closed')
      $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight)
    else
      if active != 0
        diff = scrollTop - @activeHeight * active
        $('.scroller__items section[data-section="' + (active - 1) + '"]').attr('data-state', 'closed')
        $('.scroller__items section[data-section="' + (active + 2) + '"]').attr('data-state', 'closed')
        $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight - diff)
        $('.scroller__items section[data-section="' + (active + 1) + '"]').attr('data-state', 'open').height(diff)
      else
        $('.scroller__items section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight - scrollTop)
        $('.scroller__items section[data-section="' + (active + 1) + '"]').attr('data-state', 'open').height(scrollTop)
        $('.scroller__items section[data-section="' + (active + 2) + '"]').attr('data-state', 'closed')

  revealBody: (scrollTop) =>
    if scrollTop >= (@openHeight - @activeHeight - 75)
      $('.eoy-feature__menu').addClass('overlay')
      # $('.scroller .scroller__items').slideUp('fast')
      # $('.scroller').css({'top':'0'})
      $('.article-body').css('overflow':'auto')
    else
      $('.eoy-feature__menu').removeClass('overlay')
      # $('.scroller').css({'top':'75px'})
      # $('.scroller .scroller__items').slideDown('slow')
      $('.article-body').css('overflow':'hidden')

module.exports.init = ->
  new EoyView