_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
{ Following } = require '../follow_button/index.coffee'
FlashMessage = require '../flash/index.coffee'

module.exports =
  captureSignup: (options) ->
    defaults =
      notes: "Followed #{options?.profile?.id} via #{location.pathname}"
      message: "Thank you for signing up"
      duration: 4000

    { profile, notes, message, duration } = _.defaults options, defaults

    console.log 'profile', profile, notes

    if CURRENT_USER?
      following = new Following(null, kind: 'profile')
      following.follow profile.id,
        notes: notes

      new FlashMessage
        message: message
        visibleDuration: duration

      _.delay (=>
        $.ajax
          url: '/users/sign_out'
          type: 'DELETE'
          success: =>
            location.href = profile.href()
          error: (xhr, status, errorMessage) ->
            new FlashMessage message: errorMessage
      ), duration