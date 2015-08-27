_ = require 'underscore'
qs = require 'querystring'
Q = require 'q'
{ humanize } = require 'underscore.string'
{ CURRENT_USER } = require('sharify').data
FlashMessage = require '../../../../components/flash/index.coffee'
CurrentUserFairAction = require '../../../../models/current_user_fair_action.coffee'

module.exports =
  validActions: validActions = [
    'Invitee',
    'Attendee',
    'General Admission',
    'Limited Access VIP',
    'All Access VIP'
  ]

  captureSignup: (options) ->
    defaults =
      action: "Attendee"
      message: "Thank you for signing up"
      duration: 4000

    { fair, action, message, duration } = _.defaults options, defaults

    return unless (action = humanize(action)) in validActions

    if CURRENT_USER?
      fair_action = new CurrentUserFairAction
        action: action
        fair_id: fair.id

      fair_action.save null,
        complete: ->
          new FlashMessage
            message: message
            visibleDuration: duration

          _.delay (=>
            $.ajax
              url: '/users/sign_out'
              type: 'DELETE'
              success: =>
                location.href = fair.href()
              error: (xhr, status, errorMessage) ->
                new FlashMessage message: errorMessage
          ), duration