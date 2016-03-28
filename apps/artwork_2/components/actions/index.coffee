{ ACTIONS } = require('sharify').data
openShareModal = require '../../../../components/share/index.coffee'

module.exports = ->
  $('.js-artwork-save').click (e) ->
    e.preventDefault()
    #

  $('.js-artwork-share').click (e) ->
    e.preventDefault()
    openShareModal
      media: ACTIONS.share.media
      description: ACTIONS.share.description

  $('.js-artwork-view-in-room').click (e) ->
    e.preventDefault()
    #
