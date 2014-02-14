_           = require 'underscore'
ModalView   = require './view.coffee'

module.exports = class ZoomView extends ModalView
  className: 'zoom-modal'

  template: ->
    @$img[0]

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
      @setWidth "#{@img.width}px"
      @updatePosition()
      @isLoaded()
