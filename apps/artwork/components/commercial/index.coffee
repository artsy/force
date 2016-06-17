{ COMMERCIAL } = require('sharify').data
ArtworkCommercialView = require './view.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
initPartnerStub = require '../partner_stub/index.coffee'
ZigZagBanner = require '../../../../components/zig_zag_banner/index.coffee'

shouldStick = ->
  COMMERCIAL.artwork.is_acquireable or
  COMMERCIAL.artwork.is_inquireable

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

  if ($target = $el.find '.js-artwork-inquire-button').length and not COMMERCIAL.artwork.is_acquireable
    new ZigZagBanner
      $target: $target
      name: 'inquiry'
      persist: true
      message: 'Interested in this work?<br>Contact the gallery here'
