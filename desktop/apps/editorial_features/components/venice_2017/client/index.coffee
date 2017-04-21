Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'
UAParser = require 'ua-parser-js'
initCarousel = require '../../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
Curation = require '../../../../../models/curation.coffee'

module.exports = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'fadeOutCoverAndStartVideo'

  initialize: ->
    @parser = new UAParser()
    @curation = new Curation sd.CURATION
    @section = @curation.get('sections')[sd.VIDEO_INDEX]
    @setupCarousel()
    @VeniceVideoView = new VeniceVideoView
      el: $('.venice-video')
      video: @chooseVideoFile()

  setupCarousel: ->
    @carousel = initCarousel $('.venice-carousel'),
      imagesLoaded: true
      advanceBy: 1
      wrapAround: true
      initialIndex: sd.VIDEO_INDEX
    , (carousel) =>
      flickity = carousel.cells.flickity
      flickity.on 'settle', =>
        @changeSection flickity.selectedIndex

  changeSection: (i) ->
    @section = @curation.get('sections')[i]
    # Push route
    window.history.replaceState {}, i, @section.slug
    # Swap video if it is published
    @swapVideo() if @section.published

  fadeOutCoverAndStartVideo: ->
    $('.venice-nav, .venice-carousel').fadeOut()
    @VeniceVideoView.vrView.play()

  swapVideo: ->
    @VeniceVideoView.trigger 'swapVideo',
      video: @chooseVideoFile()

  chooseVideoFile: ->
    if @parser.getBrowser().name is 'Safari'
      "#{sd.APP_URL}/vanity/scenichls/hls400k.m3u8"
    else
      sd.APP_URL + @section.video_url