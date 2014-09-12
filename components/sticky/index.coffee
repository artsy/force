{ isTouchDevice } = require '../util/device.coffee'

module.exports = class Sticky
  constructor: ->
    @$window = $(window)
    return if Stickyfill?
    require './vendor/stickyfill.js'

  add: ($el) ->
    return unless $el.length
    return if $el.height() > @visibleArea()
    @native $el
    Stickyfill.add $el[0]

  native: ($el) ->
    $el.attr 'style', "position: -webkit-sticky; position: sticky; top: #{@viewportTop()}px"

  headerHeight: ->
    $('#main-layout-header').height()

  visibleArea: ->
    @$window.height() - @headerHeight()

  viewportTop: ->
    if isTouchDevice() then 0 else @headerHeight()
