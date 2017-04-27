Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'
UAParser = require 'ua-parser-js'
initCarousel = require '../../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
Curation = require '../../../../../models/curation.coffee'
Artist = require '../../../../../models/artist.coffee'
FlashMessage = require '../../../../../components/flash/index.coffee'
{ Following, FollowButton } = require '../../../../../components/follow_button/index.coffee'
videoDescription = -> require('../templates/video_description.jade') arguments...

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
    @following = new Following(null, kind: 'artist') if sd.CURRENT_USER?
    @swapDescription()
    @setupFollowButtons()
    @VeniceVideoView = new VeniceVideoView
      el: $('.venice-video')
      video: @chooseVideoFile()
    @listenTo @VeniceVideoView, 'closeVideo', @fadeInCoverAndPauseVideo
    @listenTo @VeniceVideoView, 'videoReady', @onVideoReady

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
    @swapDescription()
    @setupFollowButtons()

  fadeOutCoverAndStartVideo: (e) ->
    return unless e.currentTarget.getAttribute('data-state') is 'ready'
    $('.venice-nav, .venice-carousel').fadeOut()
    @VeniceVideoView.vrView.play()

  fadeInCoverAndPauseVideo: ->
    $('.venice-nav, .venice-carousel').fadeIn()
    @VeniceVideoView.vrView.pause()

  onVideoReady: ->
    $('.venice-overlay__play').attr 'data-state', 'ready'

  swapVideo: ->
    @VeniceVideoView.trigger 'swapVideo',
      video: @chooseVideoFile()

  swapDescription: ->
    $('.venice-body--article').remove()
    $('.venice-body').prepend videoDescription
      section: @section
      sd: sd
    $('.venice-body--article').addClass('active')

  chooseVideoFile: ->
    if @section.published
      section = @section
    else
      section = @curation.get('sections')[0]
    if @parser.getOS().name is 'iOS'
      sd.APP_URL + section.video_url_medium
    else if @parser.getDevice().type is 'mobile'
      sd.APP_URL + section.video_url_adaptive
    else
      sd.APP_URL + section.video_url

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

  setupFollowButtons: ->
    @artists = []
    @$('.artist-follow').each (i, artist) =>
      @artists.push id: $(artist).data('id')
    @followButtons = @artists.map (artist) =>
      artist = new Artist id: artist.id
      new FollowButton
        el: @$(".artist-follow[data-id='#{artist.id}']")
        following: @following
        modelName: 'artist'
        model: artist
        context_page: "Article page" # TODO: add venice specific tracking
        context_module: 'article_artist_follow'
        href: sd.APP_URL + sd.CURRENT_PATH
    @following.syncFollows(_.pluck @artists, 'id') if sd.CURRENT_USER?
    @$('.venice-body__follow-item').show()
