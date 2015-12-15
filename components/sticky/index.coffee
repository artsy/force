_ = require 'underscore'
{ isTouchDevice } = require '../util/device.coffee'

module.exports = class Sticky
  constructor: ->
    @$window = $(window)
    @$document = $(document)

    @$window.resize _.debounce(_.bind(@rebuild, this), 250)
    @$document.on 'ajaxStop', => _.defer => @rebuild()

    return if Stickyfill?
    require './vendor/stickyfill.js'

  add: ($el) ->
    _.defer =>
      return unless $el.length
      return if $el.height() > @visibleArea()
      @native $el
      Stickyfill.add $el[0]

  native: ($el) ->
    $el.attr 'style', "position: -webkit-sticky; position: sticky; top: #{@viewportTop()}px"

  getHeaderHeight: ->
    return @headerHeight if @headerHeight

    @headerHeight = 0
    $mainHeader = $('#main-layout-header')
    if $mainHeader.is(':visible')
      @headerHeight = $mainHeader.height()
    else
      @headerHeight = $('.article-sa-sticky-header').height()

    @headerHeight

  visibleArea: ->
    @$window.height() - @getHeaderHeight()

  viewportTop: ->
    if isTouchDevice() then 0 else @getHeaderHeight()

  rebuild: ->
    return unless Stickyfill?

    top = @viewportTop()
    Stickyfill.stickies.map (sticky) =>
      sticky.css.top = top
      $(sticky.node).css 'top', top

    Stickyfill.rebuild()
