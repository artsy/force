_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
FairBrowseView = require './view.coffee'
mediator = require '../../../../lib/mediator.coffee'
{ humanize } = require 'underscore.string'
{ signupSuccess, validActions } = require '../capture_signup/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id(/)': 'booths'
    ':id/sign_up': 'signup'
    ':id/sign_up/:action': 'signup'
    ':id/capture/:action': 'capture'
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

  signup: (id, action = "attendee") =>
    return unless validActions[action]

    mediator.trigger 'open:auth',
      mode: 'register'
      copy: "Sign up to receive updates about #{@fair.nameSansYear()}"
      redirectTo: "#{@fair.href()}/capture/#{action}"

  capture: (id, action)=>
    signupSuccess fair: @fair, action: action, user: CurrentUser.orNull()

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
    @navigate "#{id}/browse/booths", trigger: true, replace: true
