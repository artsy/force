PartnerCell = require '../components/partner_cell/view.coffee'
sd = require('sharify').data
Partner = require '../../../models/partner.coffee'
module.exports.init = ->
  new PartnerCell
    el: $('.partner-cell')
    partner: new Partner sd.PARTNER