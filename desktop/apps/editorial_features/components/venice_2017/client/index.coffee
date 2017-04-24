Backbone = require 'backbone'
sd = require('sharify').data
VeniceVideoView = require './video.coffee'
UAParser = require 'ua-parser-js'
initCarousel = require '../../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
Curation = require '../../../../../models/curation.coffee'
Artist = require '../../../../../models/artist.coffee'
FlashMessage = require '../../../../../components/flash/index.coffee'
{ Following, FollowButton } = require '../../../../../components/follow_button/index.coffee'

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
    @setupFollowButtons()
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
        context_page: "Article page" # add venice specific tracking?
        context_module: 'article_artist_follow'
        href: sd.APP_URL + sd.CURRENT_PATH
    @following.syncFollows(_.pluck @artists, 'id') if sd.CURRENT_USER?
    @$('.venice-body__follow-item').show()
