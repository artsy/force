Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'
UAParser = require 'ua-parser-js'

module.exports = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'fadeOutCover'
    'click .venice-body__left': 'swapVideo'

  initialize: ->
    @parser = new UAParser()
    @VeniceVideoView = new VeniceVideoView
      el: $('.venice-video')
      # video: "#{sd.APP_URL}/vanity/scenichls/hls400k.m3u8"
      video: @getBestVideo()

  swapVideo: ->
    @VeniceVideoView.trigger 'swapVideo', { video: "#{sd.APP_URL}/vanity/videos/output3.mp4" }

  fadeOutCover: ->
    $('.venice-nav, .venice-overlay').fadeOut()
    @VeniceVideoView.vrView.play()

  getBestVideo: (useragent) ->
    ua = parser mav
    switch useragent
      when 

    "#{sd.APP_URL}/vanity/videos/scenic_mono_3.mp4"