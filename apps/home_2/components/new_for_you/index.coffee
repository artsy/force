hasSeen = require '../../../../components/has_seen/index.coffee'
mediator = require '../../../../lib/mediator.coffee'
template =-> require('./index.jade') arguments...

module.exports = (user) ->
  return unless user
  return if hasSeen 'new-for-you', 604800

  $('body').append template()

  $('.abrv-container').first().waypoint
    offset: 50
    handler: ->
      $('.new-for-you').addClass 'new-for-you__is-faded-out'

  $('.new-for-you').click ->
    $('html, body').animate
      scrollTop: $('.abrv-container').first().offset().top - 50
    $('.new-for-you').addClass 'new-for-you__is-faded-out'
