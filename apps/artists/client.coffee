_                 = require 'underscore'
sd                = require('sharify').data
Backbone          = require 'backbone'
FollowCollection  = require '../../models/follow_artist_collection.coffee'
FollowButton      = require '../artist/client/follow_button.coffee'
Artist            = require '../../models/artist.coffee'

module.exports.CarouselView = class CarouselView extends Backbone.View
  increment: 2
  active: 0
  events:
    'click .afc-next' : 'next'
    'click .afc-prev' : 'prev'

  initialize: (options) ->
    @resize = _.debounce @updateValues, 100
    $(window).on 'resize', @resize

    @updateValues()

  updateValues: (e) =>
    @$panels ||= @$('.afc-artist')
    @$images ||= @$panels.find('img')
    @$bumpers ||= @$('.afc-next, .afc-prev')

    panelWidth  = @$el.width() / @increment
    @positions  = _.map @$panels, (panel, i) -> panelWidth * i
    @stopAt     = @positions.length - @increment

    @$panels.outerWidth "#{panelWidth}px"
    @$bumpers.height "#{@$images.height()}px"

    @moveToActive(!e?) if e?
    @setPosition()

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

    (@$track ||= @$('.afc-track')).
      attr('data-state', 'transitioning').
      css('marginLeft', "-#{@positions[@active]}px").
      one($.support.transition.end, =>
        @$track.attr 'data-state', 'transitioned'
      ).emulateTransitionEnd 250

  next: (e) ->
    e?.preventDefault()
    @active += @increment
    @moveToActive()

  prev: (e) ->
    e?.preventDefault()
    @active -= @increment
    @moveToActive()

module.exports.init = ->
  $ ->
    # Setup follow button views
    followCollection = new FollowCollection if sd.CURRENT_USER?
    $('.follow-button').each ->
      $this   = $(this)
      model   = new Artist id: $this.data('id')
      new FollowButton
        followArtistCollection: followCollection
        notes: 'Followed from /artists'
        model: model
        el: $this

    # Carousel
    carousel = new CarouselView el: $('.artists-featured-carousel')
