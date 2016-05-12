CurrentUser = require '../../../../models/current_user.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = (profile) ->
  user = CurrentUser.orNull()
  following = new Following [], kind: 'profile' if user

  $el = $(".profile-follow[data-id='#{profile.id}']")

  new FollowButton
    el: $el
    following: following
    modelName: 'profile'
    href: "#{profile.href}/follow"
    model: profile
    context_page: "Show page"

  following.syncFollows [profile.id] if user
