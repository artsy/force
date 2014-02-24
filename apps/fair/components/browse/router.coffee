_               = require 'underscore'
Backbone        = require 'backbone'
qs              = require 'querystring'
FairBrowseView  = require './view.coffee'

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id'                                  : 'booths'
    ':id/browse/artists'                   : 'artists'
    ':id/browse/artist/:artist_id'         : 'artist'
    ':id/browse/booths'                    : 'booths'
    ':id/browse/booths/region/:region'     : 'boothsRegion'
    ':id/browse/booths/section/:section'   : 'boothsSection'
    ':id/browse/category/:category'        : 'category'
    ':id/browse/exhibitors'                : 'exhibitors'
    ':id/browse'                           : 'browse'

  initialize: (options) ->
    _.extend @, options
    { @boothParams, @artworkParams } = @view = new FairBrowseView
      el: $('#fair-browse')
      fair: @fair
      profile: @profile
      router: @

    Backbone.history.start pushState: true

  artist: (id, artistId) =>
    @boothParams.set artist: artistId

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
