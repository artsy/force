_ = require 'underscore'
qs = require 'querystring'
Q = require 'bluebird-q'
{ humanize } = require 'underscore.string'
FlashMessage = require '../../../../components/flash/index.coffee'

module.exports =
  validActions: validActions =
    partner: 'Fair Partner Marketing',
    invitee: 'Invitee',
    attendee: 'Attendee',
    general: 'General Admission',
    general_vip: 'Limited Access VIP',
    vip: 'All Access VIP'

  signupSuccess: (options) ->
    defaults =
      action: "Attendee"
      message: "Thank you for signing up.<br><br>You are not logged in. Log in with your details on Artsy.net or on our iPhone and iPad apps."
      duration: 10000

    { fair, action, message, duration } = _.defaults options, defaults

    return unless (action = validActions[action])

    new FlashMessage
      safe: false
      message: message
      visibleDuration: duration

    _.delay (=>
      $.ajax
        url: '/users/sign_out'
        type: 'DELETE'
        success: =>
          location.href = "#{fair.href()}/sign_up"
        error: (xhr, status, errorMessage) ->
          new FlashMessage message: errorMessage
    ), duration