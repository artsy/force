{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
MODELS =
  artwork: require '../../../models/artwork.coffee'
  profile: require '../../../models/profile.coffee'

module.exports = ($el) ->
  following = null

  { id, type } = $el.data()

  if user = CurrentUser.orNull()
    following = new Following null, kind: type
    following.syncFollows [id]

  new FollowButton
    el: $el
    following: following
    modelName: type
    model: new MODELS[type] id: id
