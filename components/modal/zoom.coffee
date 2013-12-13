_           = require 'underscore'
ModalView   = require './view.coffee'

module.exports = class ZoomView extends ModalView
  className: 'zoom-modal'

  template: -> @$img[0]

  initialize: (options) ->
    { @imgSrc } = options
    @setupImage()
    super

  setupImage: ->
    @img      = new Image()
    @img.src  = @imgSrc
    @$img     = $('<img/>').attr 'src', @imgSrc

  postRender: ->
    @isLoading()
    @$img.on 'load', =>
      @width = "#{@img.width}px"
      @setWidth()
      @setPosition()
      @isDoneLoading()

  isLoading: ->
    @$el.addClass 'is-loading'
    @$dialog.addClass('is-notransition').hide()

  isDoneLoading: ->
    @$el.removeClass 'is-loading'
    @$dialog.show()
    _.defer => @$dialog.removeClass 'is-notransition'
