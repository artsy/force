_ = require 'underscore'
_.str = require 'underscore.string'
CurrentUser = require '../../../models/current_user'

#
# PasswordEdit
#
# Inherits from CurrentUser to provide the unique API url for changing a password
# and specific password related client validation.
#
module.exports = class PasswordEdit extends CurrentUser

  defaults:
    id: 1

  url: ->
    "#{super}/password"

  errorMessages:
    new_password_min: "Minimum 8 characters."
    new_password_same: "Your new password must be different."
    password_confirmation: "Passwords don't match up. Please try again."

  validate: (attrs, options) ->
    errors = {}

    if attrs.new_password and attrs.new_password.length < 8
      errors.new_password = @errorMessages.new_password_min
    else if attrs.new_password and attrs.new_password is attrs.current_password
      errors.new_password = @errorMessages.new_password_same
    if attrs.password_confirmation and attrs.password_confirmation isnt attrs.new_password
      errors.password_confirmation = @errorMessages.password_confirmation

    # Only return errors validation failed
    return errors unless _.isEmpty errors
