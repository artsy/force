{ ARTIST, IS_PAYOFF, CURRENT_USER, INITIAL_ARTISTS } = sd = require('sharify').data
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
FollowedArtistsRailView = require '../../home/components/followed_artists/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'

testGroup = sd.ARTIST_MERCH_TEST

module.exports.init = ->
  # ARTIST_MERCH_TEST remove after test closes
  splitTest('artist_merch_test').view()
  
  if IS_PAYOFF
    view = new FollowedArtistsRailView
      $el: $('.payoff-content__content')
      user: CURRENT_USER
      module: 
        context: 
          artists: INITIAL_ARTISTS
          counts:
            artists: INITIAL_ARTISTS.length
        results: []
      useInitialArtists: true
      includeContext: false
      showHeader: false
      analyticsMessage: 'artist page sign up prompt payoff screen'

    view.render()
    return

  statuses = ARTIST.statuses
  artist = new Artist ARTIST
  user = CurrentUser.orNull()
  scrollFrame 'a.artwork-item-image-link' unless sd.EIGEN

  router = new ArtistRouter
    model: artist,
    statuses: statuses,
    user: user,
    testGroup: testGroup
  Backbone.history.start pushState: true
