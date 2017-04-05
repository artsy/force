hasSeen = require '../../../../components/has_seen/index'
mediator = require '../../../../lib/mediator'
template =-> require('./index.jade') arguments...

module.exports = (user) ->
  return unless user
  user.hasUnviewedNotifications().then (hasNotifications) ->
    return if hasSeen('new-for-you') and not hasNotifications

    $('body').append template()

    $('.abrv-container').first().waypoint
      offset: 50
      handler: ->
        user.markNotifications 'viewed'
        $('.new-for-you').addClass 'new-for-you__is-faded-out'

    $('.new-for-you').click ->
      $('html, body').animate
        scrollTop: $('.abrv-container').first().offset().top - 50
      $('.new-for-you').addClass 'new-for-you__is-faded-out'
      user.markNotifications 'viewed'
