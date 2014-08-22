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
    # Replace http with https
    html = @model.get('oembed_json').html.replace('http://', 'https://')
    @$('.video').append(html).show()
    @$('.placeholder').hide()
    @onPlay?()
    false
