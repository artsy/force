_ = require 'underscore'
{ isTouchDevice } = require '../util/device.coffee'

module.exports = class Sticky
  constructor: ->
    @$window = $(window)
    @$document = $(document)

    return if Stickyfill?
    require './vendor/stickyfill.js'

    # rebuild the sticky menu when ajax events stop firing
    # defer to wait after render
    @$document.on 'ajaxStop', => _.defer => @rebuild()

  add: ($el) ->
    _.defer =>
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

  rebuild: ->
    Stickyfill?.rebuild()
