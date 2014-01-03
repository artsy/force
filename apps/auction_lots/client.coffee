Backbone                = require 'backbone'
ZoomView                = require '../../components/modal/zoom.coffee'
mediator                = require '../../lib/mediator.coffee'
ShareView               = require '../../components/share/view.coffee'
FollowButton            = require '../artist/client/follow_button.coffee'
FollowArtistCollection  = require '../../models/follow_artist_collection.coffee'
CurrentUser             = require '../../models/current_user.coffee'
Artist                  = require '../../models/artist.coffee'
sd                      = require('sharify').data
{ isTouchDevice }       = require '../../components/util/device.coffee'

module.exports.AuctionResultsView = class AuctionResultsView extends Backbone.View
  initialize: (options) ->
    @setupShareButtons()
    @setupFollowButton()
    @touchAdjustments() if isTouchDevice()

  events:
    'click .auction-lot-image-zoom'  : 'zoomImage'
    'click .auction-lot-sale-signup' : 'signUp'

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupFollowButton: ->
    if sd.CURRENT_USER?
      @followArtistCollection = new FollowArtistCollection

    if ($button = @$('#artist-follow-button')).length
      new FollowButton
        followArtistCollection: @followArtistCollection
        model: @model
        el: $button

  touchAdjustments: ->
    @$('.bordered-pulldown').on 'click', -> $(this).trigger 'hover'

  zoomImage: (e) ->
    e.preventDefault()
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signUp: (e) ->
    e.preventDefault()
    # Use login until signup form works
    mediator.trigger 'open:auth', { mode: 'login' }

module.exports.init = ->
  $ ->
    new AuctionResultsView
      el: $('body')
      model: new Artist sd.ARTIST
