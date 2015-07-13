_ = require 'underscore'
sd = require('sharify').data
Fairs = require '../../../collections/fairs.coffee'
Clock = require '../../../components/clock/view.coffee'
CurrentUser = require '../../../models/current_user.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports.init = ->
  $clocks = $('.fpff-clock')
  fairs = new Fairs sd.FAIRS

  user = CurrentUser.orNull()
  following = new Following [], kind: 'profile' if user

  ids = fairs.map (fair) ->
    $el = $(".profile-follow[data-id='#{fair.related().profile.id}']")

    new FollowButton
      el: $el
      following: following
      modelName: 'profile'
      model: fair.related().profile
      analyticsFollowMessage: 'Followed fair, via fairs page'
      analyticsUnfollowMessage: 'Unfollowed fair, via fairs page'

    fair.related().profile.id

  following.syncFollows ids if user

  fairs.map (fair) ->
    clock = new Clock modelName: 'Fair', model: fair, el: $clocks.filter("[data-id='#{fair.id}']")
    clock.start()
