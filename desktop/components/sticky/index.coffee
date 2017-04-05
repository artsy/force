_ = require 'underscore'
{ isTouchDevice } = require '../util/device'
Stickyfill = require('stickyfill')()

module.exports = class Sticky
  constructor: ->
    @$window = $(window)
    @$document = $(document)

    @$window.resize _.debounce(_.bind(@rebuild, this), 250)
    @$document.on 'ajaxStop', => _.defer => @rebuild()

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
      # Support super articles with fullscreen header (where mainHeader is hidden)
      @headerHeight = $('.article-sa-sticky-header, .team-channel-nav').height()

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
