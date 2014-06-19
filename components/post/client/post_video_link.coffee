_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class PostVideoLink extends Backbone.View
  events:
    'click .play-button': 'showVideo'

  initialize: (options) ->
    @onPlay = options.onPlay
    @$img = @$('img')
    @render()

  render: ->
    @$el.show()

  showVideo: =>
    @$('.video').append(@model.get('oembed_json').html).show()
    @$('.placeholder').hide()
    @onPlay?()
    false
