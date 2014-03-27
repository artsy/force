_            = require 'underscore'
_.str        = require 'underscore.string'
Backbone     = require 'backbone'
CurrentUser  = require './current_user.coffee'

{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

module.exports = class UserEdit extends CurrentUser

  errorMessages:
    email_confirmation_emtpy: "Please repeat the new email."
    email_confirmation      : "Emails don't match up. Please try again."
    name_empty              : "Please enter your full name."

  validate: (attrs, options) ->
    errors = {}

    # Email
    if @get('email') != attrs.email and attrs.email_confirmation is ""
      errors.email_confirmation = @errorMessages.email_confirmation_emtpy
    else if @get('email') isnt attrs.email and attrs.email_confirmation? and attrs.email_confirmation isnt attrs.email
      errors.email_confirmation = @errorMessages.email_confirmation

    # Name
    if attrs.name and _.clean(attrs.name) is ""
      errors.name = @errorMessages.name_empty

    # Only return errors validation failed
    return errors unless _.isEmpty errors

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: ->
    $.ajax '/user/refresh', (data, status, jqxhr) =>
      console.log 'successful refresh', data
      @set data

  fetchAuthentications: (options = {}) ->
    passThrough = options.success if options.success?
    new Backbone.Collection().fetch _.extend options,
      url    : "#{ARTSY_URL}/api/v1/me/authentications"
      success: (collection) =>
        @set 'authentications', collection.toJSON()
        passThrough?()

  linkedTo: (provider) ->
    _.where(@get('authentications'), provider: provider).length > 0

  toOnOff: (attribute) ->
    if _.isBoolean(@get(attribute)) and @get(attribute)
      'on'
    else
      'off'

  onOffFacebook: ->
    if @get('publish_to_facebook') or @linkedTo('facebook')
      'on'
    else
      'off'

  onOffTwitter: ->
    if @linkedTo('twitter') then 'on' else 'off'
