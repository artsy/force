Backbone = require 'backbone'
sd = require('sharify').data
moment = require 'moment'

module.exports = class VeniceVideoView extends Backbone.View

  events:
    'click #toggleplay': 'onTogglePlay'
    'click #togglemute': 'onToggleMute'

  initialize: ->
    @$playButton = $('#toggleplay')
    @$time = $('#time')
    @$muteButton = $('#togglemute')
    @scrubberWidth = $('.venice-video__scrubber').width()
    @$scrubberMarker = $('.venice-video__scrubber-inner')
    @$scrubberTime = $('.venice-video__scrubber-time')
    @setupVideo()
    $(window).resize @onResizeWindow

  setupVideo: ->
    @vrView = new VRView.Player '#vrvideo',
      video: "#{sd.APP_URL}/vanity/videos/scenic_mono_3.mp4",
      is_stereo: false,
      is_vr_off: false,
      width: '100%',
      height: '100%',
      loop: false
    @vrView.on 'timeupdate', @updateTime

  onTogglePlay: ->
    if @vrView.isPaused
      @vrView.play()
    else
      @vrView.pause()
    @$playButton.toggleClass 'paused'

  onToggleMute: ->
    if @$muteButton.hasClass 'muted'
      @vrView.setVolume 1
    else
      @vrView.setVolume 0
    @$muteButton.toggleClass 'muted'

  updateTime: (e) =>
    $(@$scrubberTime).html @formatTime(e.currentTime)
    percentComplete = (e.currentTime / e.duration) * 100
    $(@$scrubberMarker).css { 'transform': "translateX(-#{100 - percentComplete}%)" }

  formatTime: (time) ->
    minutes = Math.floor(time / 60) % 60
    seconds = Math.floor(time % 60)
    minutes = if minutes <= 0 then 0 else minutes
    seconds = if seconds <= 0 then 0 else seconds

    result = (if minutes < 10 then '0' + minutes else minutes) + ':'
    result += if seconds < 10 then '0' + seconds else seconds

  onResizeWindow: ->
    @scrubberWidth = $('.venice-video__scrubber').width()