Profile = require '../../../../models/profile.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = (profileId) ->
  user = CurrentUser.orNull()
  following = new Following [], kind: 'profile' if user

  $el = $(".profile-follow[data-id='#{profileId}']")
  profile = new Profile id: profileId

  new FollowButton
    el: $el
    following: following
    modelName: 'profile'
    model: profile
    context_page: "Show page"

  following.syncFollows [profileId] if user
