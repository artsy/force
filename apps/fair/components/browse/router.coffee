_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
{ CURRENT_USER } = require('sharify').data
FairBrowseView = require './view.coffee'
mediator = require '../../../../lib/mediator.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id(/)': 'booths'
    ':id/sign_up': 'signup'
    ':id/capture': 'capture'
    ':id/overview(/)': 'booths'
    ':id/browse/artists(/)': 'artists'
    ':id/browse/artist/:artist_id(/)': 'artist'
    ':id/browse/artworks(/)': 'artworks'
    ':id/browse/booths(/)': 'booths'
    ':id/browse/booths/region/:region(/)': 'boothsRegion'
    ':id/browse/booths/section/:section(/)': 'boothsSection'
    ':id/browse/category/:category(/)': 'category'
    ':id/browse/exhibitors(/)': 'exhibitors'
    ':id/browse(/)': 'browse'

  initialize: (options) ->
    _.extend @, options
    { @boothParams, @artworkParams } = @view = new FairBrowseView
      el: $('#fair-browse')
      fair: @fair
      profile: @profile
      router: @

    Backbone.history.start pushState: true

  artworks: =>
    @artworkParams.trigger 'change'

  artist: (id, artistId) =>
    @boothParams.set artist: artistId

  signup: =>
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: "Sign up to follow #{@fair.get('name')}"
      redirectTo: "#{@fair.href()}/capture"

  capture: =>
    if CURRENT_USER?
      following = new Following(null, kind: 'profile')
      following.follow @profile.id,
        notes: "Followed #{@fair.get('name')} from fair sign up"

      new FlashMessage
        message: 'Thank you for signing up'
        visibleDuration: 4000

      _.delay (=>
        $.ajax
          url: '/users/sign_out'
          type: 'DELETE'
          success: =>
            location.href = @fair.href()
          error: (xhr, status, errorMessage) ->
            new FlashMessage message: errorMessage
      ), 4000

  booths: =>
    @boothParams.trigger 'change'

  boothsSection: (id, section) =>
    @boothParams.set section: section

  boothsRegion: (id, region) =>
    @boothParams.set region: region

  exhibitors: =>
    @view.exhibitorsAZ()

  artists: =>
    @view.artistsAZ()

  browse: (id) =>
    @navigate "#{id}/browse/booths", trigger: true
