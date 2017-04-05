bootstrap = require '../../../components/layout/bootstrap'
sd = require('sharify').data
Artist = require '../../../models/artist'
ArtistPageView = require './view'
CurrentUser = require '../../../models/current_user'

$ ->
  bootstrap()
  artist = new Artist sd.ARTIST
  new ArtistPageView
    model: artist
    user: CurrentUser.orNull()
