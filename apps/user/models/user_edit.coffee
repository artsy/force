_            = require 'underscore'
_.str        = require 'underscore.string'
Backbone     = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'

{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

#
# UserEdit
#
# Inherits from CurrentUser and provides methods specific to editing the user:
# client validation, refreshing the session user, fetching authentications,
# translating boolean values for the toggle component.
#
module.exports = class UserEdit extends CurrentUser

  errorMessages:
    email_confirmation_emtpy: "Please repeat the new email."
    email_confirmation      : "Emails don't match up. Please try again."
    name_empty              : "Please enter your full name."

  validate: (attrs, options) ->
    errors = {}

    # Email
    if attrs.email and @get('email') isnt attrs.email
      if attrs.email isnt attrs.email_confirmation
        errors.email_confirmation = @errorMessages.email_confirmation
      unless attrs.email_confirmation
        errors.email_confirmation = @errorMessages.email_confirmation_emtpy

    # Name
    if attrs.name and _.clean(attrs.name) is ""
      errors.name = @errorMessages.name_empty

    # Only return errors validation failed
    return errors unless _.isEmpty errors

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: ->
    @fetch url: '/user/refresh'

  updateFavorites: (isPrivate) ->
    favorites = @defaultArtworkCollection()
    $.ajax favorites.url(),
      data:
        access_token: @get 'accessToken'
        id: favorites.get 'id'
        private: isPrivate
        user_id: @get 'id'
      method: 'put'

  fetchAuthentications: (options = {}) ->
    passThrough = options.success if options.success?
    new Backbone.Collection().fetch _.extend options,
      url    : "#{ARTSY_URL}/api/v1/me/authentications"
      success: (collection) =>
        @set 'authentications', collection.toJSON()
        passThrough?()

  isLinkedTo: (provider) ->
    _.where(@get('authentications'), provider: provider).length > 0

  toOnOff: (attribute) ->
    if _.isBoolean(@get(attribute)) and @get(attribute)
      'on'
    else
      'off'

  onOffFacebook: ->
    if @get('publish_to_facebook') or @isLinkedTo('facebook')
      'on'
    else
      'off'

  onOffTwitter: ->
    if @isLinkedTo('twitter') then 'on' else 'off'
