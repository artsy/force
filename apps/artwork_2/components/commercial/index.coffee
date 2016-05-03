{ COMMERCIAL } = require('sharify').data
ArtworkCommercialView = require './view.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
initPartnerStub = require '../partner_stub/index.coffee'

shouldStick = ->
  COMMERCIAL.artwork.is_acquireable or
  COMMERCIAL.artwork.is_contactable

module.exports = ->
  $el = $('.js-artwork-commercial')

  return unless $el.length

  view = new ArtworkCommercialView
    el: $el
    data: COMMERCIAL

  sticky = new Sticky
  sticky.add $el if shouldStick()

  initPartnerStub $el
    .click ->
      sticky.rebuild()
