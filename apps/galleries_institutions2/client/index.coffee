PartnerCell = require '../components/partner_cell/view.coffee'
sd = require('sharify').data
Partner = require '../../../models/partner.coffee'
Partners = require '../../../collections/partners.coffee'

module.exports.init = ->
  partners = new Partners sd.PARTNERS

  _.each $('.partner-cell'), (el) ->
    $el = $(el)
    new PartnerCell
      $el: $el
      partner: partners.get $el.data('id')