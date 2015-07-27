_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Fairs = require '../../../collections/fairs.coffee'
CurrentUser = require '../../../models/current_user.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports.init = ->
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

  initCarousel $('.fairs__promo__slideshow'),
    $navigation: $('.mgr-navigation')
    autoPlay: true