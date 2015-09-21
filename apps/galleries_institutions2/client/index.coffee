PartnerCellGrid = require '../components/partner_cell_grid/view.coffee'
sd = require('sharify').data
Partner = require '../../../models/partner.coffee'
Partners = require '../../../collections/partners.coffee'

module.exports.init = ->
  partners = new Partners sd.PARTNERS
  new PartnerCellGrid
    partners: partners
    $el: $('.partner-cell-grid')