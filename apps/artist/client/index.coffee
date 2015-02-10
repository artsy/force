_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
analytics = require './analytics.coffee'
attachArtworkModal = require '../../../components/page_modal/index.coffee'
splitTest = require '../../../components/split_test/index.coffee'

module.exports.init = ->
  analytics.listenToEvents()

  model = new Artist sd.ARTIST
  user = CurrentUser.orNull()
  router = new ArtistRouter model: model, user: user

  Backbone.history.start pushState: true

  if splitTest('artwork_modal').outcome() is 'modal'
    selectors = [
      '.carousel-figure a[href^="/artwork"]'
      '#artwork-section .artwork-item-image-link'
    ]

    attachArtworkModal selectors.join(', '), {
      'artist/:id': 'close'
      'artwork/:id': 'modal'
    }

  analytics.trackArtistPageView model
