bootstrap = require '../../../components/layout/bootstrap'
sd = require('sharify').data
CurrentUser = require '../../../models/current_user'
{ Profile } = require '../../../models/profile'
{ FollowProfiles } = require '../../../collections/follow_profiles'
{ FollowButtonView } = require '../../../components/follow_button/view'

$ ->
  bootstrap()

  profile = new Profile sd.PARTNER_PROFILE

  follows = new FollowProfiles []
  followButton = new FollowButtonView
    collection: follows
    el: $ '.partner-profile-follow'
    type: 'Partner'
    followId: profile.get 'id'
    isLoggedIn: CurrentUser.orNull()
    _id: profile.get '_id'
    context_module: 'Partner profile page'

  follows.syncFollows [profile.get 'id']

  window.follows = follows
  window.followButton = followButton
