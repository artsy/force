_ = require 'underscore'
qs = require 'querystring'
Q = require 'bluebird-q'
{ humanize } = require 'underscore.string'
{ Following } = require '../../../../components/follow_button/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'
CollectorProfile = require '../../../../models/collector_profile.coffee'

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
      user: null

    { fair, action, message, duration, user } = _.defaults options, defaults

    return unless (action = humanize(action)) in validActions
    if user
      { collectorProfile } = user.related()
      { userFairActions } = collectorProfile.related()

      following = new Following(null, kind: 'profile')

      Q.all [
        userFairActions.create
          fair_id: fair.id
          action: action
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