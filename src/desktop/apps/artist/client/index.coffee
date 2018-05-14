{ ARTIST, CURRENT_USER, INITIAL_ARTISTS } = sd = require('sharify').data
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
FollowedArtistsRailView = require '../../home/components/followed_artists/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'

testGroup = sd.ARTIST_MARKET_DATA_TEST

module.exports.init = ->
  # TODO: ARTIST_MARKET_DATA_TEST remove after test closes
  splitTest('artist_market_data_test').view()

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
