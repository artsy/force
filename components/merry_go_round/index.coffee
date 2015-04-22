_ = require 'underscore'
Flickity = require 'flickity'
Backbone = require 'backbone'
template = -> require('./templates/navigation.jade') arguments...

class MerryGoRoundNavView extends Backbone.View
  tagName: 'nav'
  className: '.mgr-navigation'

  events:
    'click .js-mgr-next': 'next'
    'click .js-mgr-prev': 'prev'
    'click .js-mgr-select': 'select'

  initialize: ({ @flickity }) ->
    @flickity.on 'cellSelect', @render
    $(document).on 'keydown.mgr', @keypress

  keypress: (e) =>
    switch e.keyCode
      when 37
        @flickity.previous true
      when 39
        @flickity.next true

  next: (e) ->
    e.preventDefault()
    @flickity.next true

  prev: (e) ->
    e.preventDefault()
    @flickity.previous true

  select: (e) ->
    e.preventDefault()
    @flickity.select $(e.currentTarget).data('index')

  render: =>
    @$el.html template
      length: @flickity.cells.length
      index: @flickity.selectedIndex
    this

  remove: ->
    $(document).off 'keydown.mgr'
    @flickity.destroy()
    super

module.exports = ($el, options = {}) ->
  $flickity = $el.find(options.selector or '.js-mgr-cells')

  totalWidth = _.reduce $flickity.find(options.cellSelector or '.js-mgr-cell'), (memo, el) ->
    $(el).width() + memo
  , 0

  wrapAround = totalWidth >= $(window).width()

  flickity = new Flickity $flickity[0], _.defaults options,
    cellSelector: '.js-mgr-cell'
    cellAlign: 'left'
    wrapAround: wrapAround
    pageDots: false
    prevNextButtons: false
    accessibility: false # Handled on `document`

  new MerryGoRoundNavView flickity: flickity, el: $el.find('.js-mgr-navigation')
