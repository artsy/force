_ = require 'underscore'
Device = require '../util/device.coffee'

module.exports = class Scrollbar
  constructor: ->
    @$body = $('body')
    @hasScrollbar = $(document).height() > @$body.height()
    @$els = @$body.add $('#main-layout-header') # Elements to pad when scrollbar width is simulated

  disable: ->
    @fixFirefoxJump(true)
    @$body.addClass 'is-scrolling-disabled'
    return unless @hasScrollbar
    @$els.css 'padding-right', ((@scrollbarWidth ?= @measure()) or 0)

  reenable: ->
    @fixFirefoxJump(false)
    @$body.removeClass 'is-scrolling-disabled'
    @$els.css 'padding-right', ''

  fixFirefoxJump: (set) ->
    return unless Device.isFirefox()
    @ffTop = $('body, html').scrollTop() if set
    _.defer => $('body, html').scrollTop @ffTop

  # http://davidwalsh.name/detect-scrollbar-width
  measure: ->
    scrollDiv = document.createElement 'div'
    scrollDiv.className = 'scrollbar-measure'
    @$body.append scrollDiv
    scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    @$body[0].removeChild scrollDiv
    scrollbarWidth
