Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'
UAParser = require 'ua-parser-js'
initCarousel = require '../../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
Curation = require '../../../../../models/curation.coffee'
FlashMessage = require '../../../../../components/flash/index.coffee'

module.exports = class VeniceView extends Backbone.View

  events:
    'click .venice-overlay__play': 'fadeOutCoverAndStartVideo'
    'click .venice-overlay__cta-button': 'showCta'
    'click .venice-overlay__subscribe-form button': 'onSubscribe'

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
    window.history.replaceState {}, i, '/venice-biennale/' + @section.slug
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

  showCta: (e) ->
    @$(e.target).fadeOut()
    @$(e.target).next('.venice-overlay__subscribe-form').fadeIn()

  onSubscribe: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    @email = @$(e.currentTarget).prev('input').val()
    $.ajax
      type: 'POST'
      url: '/editorial-signup/form'
      data:
        email: @email
        name: sd.CURRENT_USER?.name or= ''
      error: (res) =>
        new FlashMessage message: 'Whoops, there was an error. Please try again.'
        @$(e.currentTarget).removeClass 'is-loading'
      success: (res) =>
        new FlashMessage message: 'Thank you for signing up.'
        @$(e.currentTarget).removeClass 'is-loading'
        @$(e.currentTarget).prev('input').val('')
        @$(e.currentTarget).closest('.venice-overlay__subscribe-form').fadeOut()
        @$(e.currentTarget).closest('.venice-overlay__subscribe').find('.venice-overlay__cta-button').fadeIn()