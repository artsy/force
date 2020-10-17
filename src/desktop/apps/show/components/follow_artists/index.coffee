Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ Following, FollowButton } = require '../../../../components/follow_button/index'
{ ContextModule } = require "@artsy/cohesion"

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
      context_module: ContextModule.showInfo

    artist.id

  following.syncFollows ids if user
