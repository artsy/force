_                       = require 'underscore'
Backbone                = require 'backbone'

module.exports = class PostVideoLink extends Backbone.View

  initialize: (options) ->
    @onPlay = options.onPlay
    @$img = @$('img')
    @render()

  render: ->
    @positionPlayButton()
    @$el.show()

  positionPlayButton: ->
    width = Number(@$img.attr 'width')
    height = Number(@$img.attr 'height')
    return unless width > 0 && height > 0

    @$('.play-button')
      .css('top', Math.floor((height - 78) / 2) + "px")
      .show()

  events:
    'click .play-button' : 'showVideo'

  showVideo: =>
    @$('.video').append(@model.get('oembed_json').html).show()
    @$('.placeholder').hide()
    @onPlay?()
    return false
