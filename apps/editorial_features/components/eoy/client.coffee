Backbone = require 'backbone'

module.exports.EoyView = class EoyView extends Backbone.View

  initialize: ->
    #height of all sections collapsed
    @flattenedHeight = $('section').length * 20
    #height of one section open
    @activeHeight = $(window).height() - 75 - @flattenedHeight
    #bottom scroll border of slinky content
    @openHeight = (($('section').length + 1 ) * @activeHeight) + @flattenedHeight + 75
    $('.feature-content').height(@openHeight)
    $('.feature-content section').attr('data-state', 'closed')
    $('.feature-content section').first().find('.inner .left').height(@activeHeight)
    @getScrollZones()
    @doSlinky()
    @watchScrolling()

  watchScrolling: =>
    $(window).scroll () =>
      @doSlinky()

  getScrollZones: =>
    @scrollZones = []
    for i in [0..$('section').length + 1]
      @scrollZones.push( (i + 1) * @activeHeight )
    return @scrollZones

  closestSection: =>
    scrollTop = $(window).scrollTop()
    scrollZones = @getScrollZones()
    closest = Math.max.apply(null, scrollZones)
    for i in [0..scrollZones.length + 1]
      if scrollZones[i] >= scrollTop and scrollZones[i] < closest
        closest = i
    return closest

  doSlinky: =>
    active = @closestSection()
    scrollTop = $(window).scrollTop()
    if scrollTop == 0
      $('section[data-section!="' + active + '"]').attr('data-state', 'closed')
      $('section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight)
    else
      if active != 0
        diff = scrollTop - @activeHeight * active
        $('section[data-section="' + (active - 1) + '"]').attr('data-state', 'closed')
        $('section[data-section="' + (active + 2) + '"]').attr('data-state', 'closed')
        $('section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight - diff)
        $('section[data-section="' + (active + 1) + '"]').attr('data-state', 'open').height(diff)
      else
        $('section[data-section="' + active + '"]').attr('data-state', 'open').height(@activeHeight - scrollTop)
        $('section[data-section="' + (active + 1) + '"]').attr('data-state', 'open').height(scrollTop)
        $('section[data-section="' + (active + 2) + '"]').attr('data-state', 'closed')

module.exports.init = ->
  new EoyView