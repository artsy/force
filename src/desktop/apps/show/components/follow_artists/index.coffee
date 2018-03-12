Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = (artists) ->
  user = CurrentUser.orNull()
  following = new Following if user

  ids = artists.map (artist) ->
    $el = $(".artist-follow[data-id='#{artist.id}']")

    new FollowButton
      el: $el
      following: following
      modelName: 'artist'
      model: new Backbone.Model artist
      context_page: "Show page"

    artist.id

  following.syncFollows ids if user
