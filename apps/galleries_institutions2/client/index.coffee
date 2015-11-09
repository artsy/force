PartnerCellCarousel = require '../components/partner_cell_carousel/view.coffee'
sd = require('sharify').data
Partner = require '../../../models/partner.coffee'
Partners = require '../../../collections/partners.coffee'

module.exports.init = ->
  partners = new Partners sd.PARTNERS

  @carousels = $('.partner-carousel').map (i, el) =>
    carousel = new PartnerCellCarousel
      partners: partners
      el: el
    carousel.renderCells()
    carousel.setupCarousel()

