_ = require 'underscore'
qs = require 'querystring'
Q = require 'bluebird-q'
{ humanize } = require 'underscore.string'
{ Following } = require '../../../../components/follow_button/index.coffee'
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
      message: "Thank you for signing up.<br><br>You are not logged in. Log in with your details on Artsy.net or on our iPhone and iPad apps."
      duration: 10000

    { fair, action, message, duration } = _.defaults options, defaults

    return unless (action = humanize(action)) in validActions

    if CURRENT_USER?
      fairAction = new CurrentUserFairAction
        action: action
        fair_id: fair.id

      following = new Following(null, kind: 'profile')

      Q.all [
        fairAction.save null
        following.follow fair.profileId()
      ]
      .then ->
        new FlashMessage
          safe: false
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