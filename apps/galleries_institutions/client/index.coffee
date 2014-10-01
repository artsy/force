_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Profile = require '../../../models/profile.coffee'
{ FollowButton, Following } = require '../../../components/follow_button/index.coffee'

module.exports.init = ->
  following = new Following([], kind: 'profile') if CURRENT_USER?
  $buttons = $('.follow-button')
  ids = _.map $buttons, (el) ->
    id = ($el = $(el)).data 'id'
    new FollowButton
      following: following
      modelName: 'profile'
      model: new Profile id: id
      el: $el
    id
  following?.syncFollows ids
