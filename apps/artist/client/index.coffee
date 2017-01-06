{ ARTIST, IS_PAYOFF, CURRENT_USER } = sd = require('sharify').data
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
FollowedArtistsRailView = require '../../home/components/followed_artists/view.coffee'

module.exports.init = ->
  if IS_PAYOFF
    view = new FollowedArtistsRailView
      $el: $("#artist-page")
      user: CURRENT_USER
      module: 
        context: 
          artists: []
          counts:
            artists: 0
        results: []

    view.render()
    return
  statuses = ARTIST.statuses
  artist = new Artist ARTIST
  user = CurrentUser.orNull()
  scrollFrame 'a.artwork-item-image-link' unless sd.EIGEN
  router = new ArtistRouter
    model: artist,
    statuses: statuses,
    user: user
  Backbone.history.start pushState: true
