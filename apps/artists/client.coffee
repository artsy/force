_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
imagesLoaded  = require '../../lib/vendor/imagesloaded.js'
Artist        = require '../../models/artist.coffee'
analytics     = require '../../lib/analytics.coffee'

{ Following, FollowButton } = require '../../components/follow_button/index.coffee'

module.exports.CarouselView = class CarouselView extends Backbone.View
  increment: 2
  active: 0
  events:
    'click .afc-next' : 'next'
    'click .afc-prev' : 'prev'

  initialize: (options) ->
    @resize = _.debounce @updateValues, 100
    $(window).on 'resize', @resize

    # Wait for the first image to load before enabling anything
    @$el.imagesLoaded?().progress _.once(@updateValues)

  updateValues: (e) =>
    @$panels    ?= @$('.afc-artist')
    @$images    ?= @$panels.find('img')
    @$bumpers   ?= @$('.afc-next, .afc-prev')

    panelWidth  = @$el.width() / @increment
    @positions  = _.map @$panels, (panel, i) -> panelWidth * i
    @stopAt     = @positions.length - @increment

    @$panels.outerWidth "#{panelWidth}px"
    @$bumpers.height "#{@$images.height()}px"

    @moveToActive(!e?) if e?

  setPosition: ->
    position = if @active is 0
      'start'
    else if @active >= @stopAt
      'end'
    else
      'middle'

    @$el.attr 'data-position', position

  moveToActive: (transition=true) ->
    return @active = 0 if @active < 0 # Beginning
    return @active = @stopAt if @active >= @positions.length # End

    @$el.attr 'data-transitions', transition
    @setPosition()

    (@$track ?= @$('.afc-track')).
      attr('data-state', 'transitioning').
      css('marginLeft', "-#{@positions[@active]}px").
      one($.support.transition.end, =>
        @$track.attr 'data-state', 'transitioned'
      ).emulateTransitionEnd 250

  next: (e) ->
    e?.preventDefault()

    @active += @increment
    @moveToActive()

    analytics.track.click 'Previous page in /artists carousel'

  prev: (e) ->
    e?.preventDefault()

    @active -= @increment
    @moveToActive()

    analytics.track.click 'Previous page in /artists carousel'

module.exports.ArtistsView = class ArtistsView extends Backbone.View
  initialize: (options) ->
    @setupCarouselView()

    @following = new Following(null, kind: 'artist') if sd.CURRENT_USER?
    @setupFollowing()

  setupCarouselView: ->
    @carouselView = new CarouselView el: @$('.artists-featured-carousel')

  setupFollowing: ->
    featuredArtistFollowIds   = @setupFollowButtons @$('.artists-featured-carousel .follow-button'), 'Followed from /artists featured'
    trendingArtistFollowIds   = @setupFollowButtons @$('.artists-featured-genes .follow-button'), 'Followed from /artists trending'

    @following?.syncFollows featuredArtistFollowIds.concat(trendingArtistFollowIds)

  # return {Array} array of artist IDs
  setupFollowButtons: ($buttons, message) ->
    _.map $buttons, (el) =>
      id = ($el = $(el)).data 'id'
      new FollowButton
        analyticsFollowMessage: message
        following: @following
        notes: message
        model: new Artist id: id
        el: $el
      id

module.exports.init = ->
  $ ->
    new ArtistsView el: $('body')
