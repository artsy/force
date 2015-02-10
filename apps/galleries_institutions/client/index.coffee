_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Profile = require '../../../models/profile.coffee'
Partner = require '../../../models/partner.coffee'
{ FollowButton, Following } = require '../../../components/follow_button/index.coffee'

module.exports.init = ->
  # Sync follows
  following = new Following([], kind: 'profile') if CURRENT_USER?

  followIds = $('.follow-button').map ->
    id = ($el = $(this)).data 'id'
    new FollowButton
      following: following
      modelName: 'profile'
      model: new Profile id: id
      el: $el
    id

  following?.syncFollows followIds.get()

  # Sync locations
  $('.gip-location').each ->
    id = ($el = $(this)).data 'id'
    partner = new Partner id: id
    partner.locations().fetch success: =>
      $el.text partner.displayLocations()
