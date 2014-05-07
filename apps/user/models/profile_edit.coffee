_           = require 'underscore'
_.str       = require 'underscore.string'
Backbone    = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
{ API_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

#
# ProfileEdit
#
# Extends CurrentUser to get the automatic sync xapp token insertion.
# Handles client validation for profile updates and on/off methods for
# artsy toggle controls.
#
module.exports = class ProfileEdit extends CurrentUser

  # Note: Because of the CurrentUser inheritance, this must be overridden,
  # setting idAttribute to _id and defining urlRoot won't do the job.
  url: ->
    "#{API_URL}/api/v1/profile/#{@get('_id')}"

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
