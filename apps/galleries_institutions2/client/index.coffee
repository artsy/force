sd = require('sharify').data
PartnerCellCarousel = require '../components/partner_cell_carousel/view.coffee'
Partner = require '../../../models/partner.coffee'
Partners = require '../../../collections/partners.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'

module.exports.init = ->
  initPrimaryCarousel()

  partners = new Partners sd.PARTNERS

  @carousels = $('.partner-carousel').map (i, el) =>
    carousel = new PartnerCellCarousel
      partners: partners
      el: el
    carousel.renderCells()
    carousel.setupCarousel()
