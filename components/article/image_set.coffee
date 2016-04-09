Backbone = require 'backbone'
template = -> require('./templates/image_set.jade') arguments...
{ resize } = require '../resizer/index.coffee'

module.exports = class ImageSetView extends Backbone.View

  events:
    'click .js__left': 'previous'
    'click .js__right': 'next'

  initialize: (options) ->
    { @collection } = options
    @length = @collection.length
    @currentIndex = 0
    $(window).on 'keyup.modalize', @onKeyUp

  render: ->
    @$el.html template
      item: @collection[@currentIndex]
      resize: resize
      length: @length
      currentIndex: @currentIndex
    this

  next: ->
    @currentIndex = if @currentIndex is @length - 1 then 0 else @currentIndex + 1
    @render()

  previous: ->
    @currentIndex = if @currentIndex is 0 then @length - 1 else @currentIndex - 1
    @render()

  onKeyUp: (e) =>
    if e.keyCode is 37
      @previous()
    else if e.keyCode is 39
      @next()
