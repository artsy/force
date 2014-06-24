_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
{ API_URL } = require('sharify').data

module.exports = class UserEdit extends CurrentUser
  publishFavorites: (boolean, options = {}) ->
    @set 'public_favorites', boolean
    favorites = @defaultArtworkCollection()
    $.ajax favorites.url(), _.extend options,
      method: 'PUT'
      data:
        access_token: @get 'accessToken'
        id: favorites.id
        private: !boolean
        user_id: @id

  fetchAuthentications: (options = {}) ->
    new Backbone.Collection().fetch _.extend options,
      url: "#{API_URL}/api/v1/me/authentications"
      success: _.wrap options.success, (success, collection, response, options) =>
        @set 'authentications', collection.toJSON()
        success? collection, response, options

  isLinkedTo: (provider) ->
    _.where(@get('authentications'), provider: provider).length > 0

  checked: (attribute) ->
    if (_.isBoolean(@get attribute) and @get(attribute)) then true else undefined
