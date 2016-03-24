Backbone = require 'backbone'

module.exports = class MerryGoRoundNavView extends Backbone.View
  tagName: 'nav'
  className: '.mgr-navigation'

  events:
    'click .js-mgr-next': 'next'
    'click .js-mgr-prev': 'prev'
    'click .js-mgr-select': 'select'

  initialize: ({ @flickity, @contain, @template }) ->
    @flickity.on 'cellSelect', @render
    @flickity.on 'cellSelect', @announce

    $(document).on 'keydown.mgr', @keypress

  keypress: (e) =>
    return if $(e.target).is(':input')
    switch e.keyCode
      when 37
        @prev e
      when 39
        @next e

  target: ->
    @flickity.selectedCell.target

  announce: =>
    if @isStart()
      @trigger 'start'
    else if @isEnd()
      @trigger 'end'

  isStart: ->
    @target() is @flickity.cells[0].target

  isEnd: ->
    @target() is @flickity.getLastCell().target

  next: (e) ->
    return if @contain and @isEnd()
    e.preventDefault()
    @flickity.next true

  prev: (e) ->
    return if @contain and @isStart()
    e.preventDefault()
    @flickity.previous true

  select: (e) ->
    e.preventDefault()
    @flickity.select $(e.currentTarget).data('index')

  render: =>
    @$el.html @template
      length: @flickity.cells.length
      index: @flickity.selectedIndex
      contain: @contain
      isStart: @isStart()
      isEnd: @isEnd()
    this

  remove: ->
    $(document).off 'keydown.mgr'
    @flickity.destroy()
    super
