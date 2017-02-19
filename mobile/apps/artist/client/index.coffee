bootstrap = require '../../../components/layout/bootstrap.coffee'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
ArtistPageView = require './view.coffee'
CurrentUser = require '../../../models/current_user.coffee'

$ ->
  bootstrap()
  artist = new Artist sd.ARTIST
  new ArtistPageView
    model: artist
    user: CurrentUser.orNull()
