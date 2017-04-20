Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'

module.exports = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'fadeOutCover'
    'click .venice-body__left': 'swapVideo'

  initialize: ->
    @VeniceVideoView = new VeniceVideoView
      el: $('.venice-video')
      # video: "#{sd.APP_URL}/vanity/scenichls/hls400k.m3u8"
      video: "#{sd.APP_URL}/vanity/videos/scenic_mono_3.mp4"

  swapVideo: ->
    @VeniceVideoView.trigger 'swapVideo', { video: "#{sd.APP_URL}/vanity/videos/output3.mp4" }

  fadeOutCover: ->
    $('.venice-nav, .venice-overlay').fadeOut()
    @VeniceVideoView.vrView.play()
