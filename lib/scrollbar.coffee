module.exports = class Scrollbar
  constructor: (options = {})->
    { $els } = options
    @$body = $('body')
    @$els = $els?.add(@$body) or @$body

  set: ->
    @fixFirefoxJump(true)
    @$body.addClass 'is-modal'
    @$els.css 'padding-right', ((@scrollbarWidth ?= @measure()) or 0)

  reset: ->
    @fixFirefoxJump(false)
    @$body.removeClass 'is-modal'
    @$els.css 'padding-right', ''

  fixFirefoxJump: (set) ->
    return unless navigator.userAgent.match('Firefox')
    @ffTop = $('body, html').scrollTop() if set
    setTimeout => $('body, html').scrollTop @ffTop

  # http://davidwalsh.name/detect-scrollbar-width
  measure: ->
    scrollDiv = document.createElement 'div'
    scrollDiv.className = 'scrollbar-measure'
    @$body.append scrollDiv
    scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    @$body[0].removeChild scrollDiv
    scrollbarWidth
