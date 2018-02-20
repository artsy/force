_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
{ API_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

module.exports = class UserEdit extends Backbone.Model

  errorMessages:
    email_confirmation_emtpy: "Please repeat the new email."
    email_confirmation: "Emails don't match up. Please try again."
    name_empty: "Please enter your full name."

  url: -> "#{API_URL}/api/v1/me"

  validate: (attrs, options) ->
    errors = {}

    # Email
    if attrs.email and @get('email') isnt attrs.email
      if attrs.email isnt attrs.email_confirmation
        errors.email_confirmation = @errorMessages.email_confirmation
      unless attrs.email_confirmation
        errors.email_confirmation = @errorMessages.email_confirmation_emtpy

    # Name
    if attrs.name and _s.clean(attrs.name) is ""
      errors.name = @errorMessages.name_empty

    # Only return errors validation failed
    return errors unless _.isEmpty errors

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: ->
    @fetch url: '/user/refresh'
