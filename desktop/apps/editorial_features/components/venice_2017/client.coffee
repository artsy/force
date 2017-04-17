Backbone = require 'backbone'
sd = require('sharify').data

module.exports.VeniceView = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'playVideo'

  initialize: ->
    @setupVideo()

  setupVideo: ->
    vrView = new VRView.Player '#vrvideo',
      video: "#{sd.APP_URL}/vanity/videos/scenic_mono_3.mp4",
      is_stereo: false,
      is_vr_off: false,
      width: '100%',
      height: '100%'

  playVideo: ->
    $('.venice-nav, .venice-overlay').fadeOut()

module.exports.init = ->
  new VeniceView el: $('.venice-feature')
