{ Following, FollowButton } = require '../../../components/follow_button/index'
CurrentUser = require '../../../models/current_user'
MODELS =
  artist: require '../../../models/artist'
  profile: require '../../../models/profile'

module.exports = ($els) ->
  following = null

  return unless $els.length

  $els.map ->
    $el = $(this)

    { id, _id, type } = $el.data()

    if user = CurrentUser.orNull()
      following = new Following null, kind: type
      following.syncFollows [id]

    new FollowButton
      el: $el
      following: following
      modelName: type
      model: new MODELS[type] id: id, _id: _id
      context_page: 'Artwork page'
