Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'

module.exports = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'fadeOutCover'

  initialize: ->
    @VeniceVideoView = new VeniceVideoView el: $('.venice-video')

  fadeOutCover: ->
    $('.venice-nav, .venice-overlay').fadeOut()
