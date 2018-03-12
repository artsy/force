_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../models/current_user.coffee'
{ Following, FollowButton } = require '../follow_button/index.coffee'

module.exports = (page = 'EOY 2016') ->
  user = CurrentUser.orNull()

  following = new Following(null, kind: 'artist') if user

  ids = $('.eoy-artist-item__name__follow-button').map ->
    new FollowButton
      context_page: page
      context_module: "EOY 2016 Artist list"
      following: following
      model: new Backbone.Model id: $(this).data('id')
      modelName: 'artist'
      hideSuggestions: true
      el: $(this)

    return $(this).data('id')

  following?.syncFollows ids
