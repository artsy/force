require '../../../../../node_modules/waypoints/lib/jquery.waypoints.js'

{ CITY, PARTNERS } = require('sharify').data
{ bootstrap } = require '../../../components/layout/bootstrap'
{ Partners } = require '../../../collections/partners'
template = -> require('../templates/partner.jade') arguments...

render = ($el, partner) ->
  $el.html template
    partner: partner
    city: CITY

fetch = ($el, partner) ->
  return if partner.fetched
  partner.fetched = true

  $.when.apply null, [
    partner.related().locations.fetch()
    partner.related().shows.fetch()
  ]
  .then ->
    render $el, partner

module.exports.init = ->
  bootstrap()

  partners = new Partners PARTNERS

  $('.js-partner').waypoint (direction) ->
    return unless direction is 'down'

    $el = $(@element)
    partner = partners.get $el.data('id')
    fetch $el, partner

  , offset: 'bottom-in-view'
