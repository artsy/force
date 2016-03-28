{ ACTIONS } = require('sharify').data
Artwork = require '../../../../models/artwork.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
SaveButton = require '../../../../components/save_button/view.coffee'
openShareModal = require '../../../../components/share/index.coffee'

module.exports = ->
  artwork = new Artwork ACTIONS.save

  if user = CurrentUser.orNull()
    user.initializeDefaultArtworkCollection()
    saved = user.defaultArtworkCollection()
    saved.addRepoArtworks artwork
    saved.syncSavedArtworks()

  new SaveButton
    el: $('.js-artwork-save')
    model: artwork
    saved: saved

  $('.js-artwork-share').click (e) ->
    e.preventDefault()
    openShareModal
      media: ACTIONS.share.media
      description: ACTIONS.share.description

  $('.js-artwork-view-in-room').click (e) ->
    e.preventDefault()
    #
