{ CURRENT_USER } = require('sharify').data
{ FollowButton, Following } = require '../../../../components/follow_button/index.coffee'
Artist = require '../../../../models/artist.coffee'

module.exports = ->
  $('.js-artwork-metadata-phone-toggle').click (e) ->
    e.preventDefault()
    $(this).hide()
    $('.js-artwork-metadata-phone-toggleable').show()

  if CURRENT_USER?
    following = new Following null, kind: 'artist'

  ids = $('.js-artist-follow-button')
    .map ->
      id = ($el = $(this)).data 'id'
      new FollowButton
        following: following
        model: new Artist id: id
        modelName: 'artist'
        el: $el
      id
    .get()

  if CURRENT_USER?
    following.syncFollows ids
