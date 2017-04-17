Backbone = require 'backbone'

module.exports.VeniceView = class VeniceView extends Backbone.View

  initialize: ->
    @setupVideo()

  setupVideo: ->
    vrView = new VRView.Player '#vrvideo',
      video: "#{sd.APP_URL}/vanity/videos/output3.mp4",
      is_stereo: false,
      is_vr_off: false,
      width: '100%',
      height: '100%'
    # paused = false
    # vrView.on 'click', (event) ->
    #   if paused
    #     vrView.play()
    #     paused = false
    #   else
    #     vrView.pause()
    #     paused = true

module.exports.init = ->
  new VeniceView
