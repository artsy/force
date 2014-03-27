_           = require 'underscore'
_.str       = require 'underscore.string'
Backbone    = require 'backbone'
CurrentUser = require './current_user.coffee'
{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

module.exports = class ProfileEdit extends CurrentUser

  # Note: the parent url needs to be overridden, defining urlRoot isn't enough
  url: ->
    "#{ARTSY_URL}/api/v1/profile/#{@get('_id')}"

  errorMessages:
    id_min    : "is too short (minimum 3 characters)"
    id_invalid: "can only have letters, numbers, '-', and '_'"

  validate: (attrs, options) ->
    errors = {}
    if attrs.id
      if attrs.id.length < 3
        errors.handle = @errorMessages.id_min
      else if /[^a-z0-9_-]/i.test attrs.id
        errors.handle = @errorMessages.id_invalid

    # Only return errors validation failed
    return errors unless _.isEmpty errors

  onOffPublic: ->
    unless @get('private')
      'on'
    else
      'off'

  onOffFavorites: (artworkCollection) ->
    unless artworkCollection.get('private')
      "on"
    else
      "off"
