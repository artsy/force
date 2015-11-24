_ = require 'underscore'
zoom = require '../../../../components/zoom/index.coffee'

module.exports = class FlickityZoomSequence
  zoom: zoom

  clicked: false

  constructor: (flickity) ->
    @flickity = flickity

  selected: ->
    @flickity
      .cells[@flickity.selectedIndex]
      .element

  src: ->
    $(@selected())
      .find 'img'
      .attr 'src'

  click: (e, p, el, idx) =>
    @clicked = true
    @flickity.select idx

  select: =>
    if @clicked
      @modal?.close()
      @modal = @zoom @src()
      @modal.view.on 'closed', (e) =>
        # Disengage `clicked` if close originates from a UI source
        @clicked = false if _.has e, 'target'

  bind: ->
    @flickity
      .on 'staticClick', @click
      .on 'cellSelect', @select

  remove: ->
    @flickity
      .off 'staticClick', @click
      .off 'cellSelect', @select
