globalClientSetup = require '../../lib/global_client_setup.coffee'
HeaderView = require './header/view.coffee'
FooterView = require './footer/view.coffee'
{ setupRail, shouldShowRVARail } = require '../recently_viewed_artworks/index.coffee'

module.exports = ->
  globalClientSetup()
  new HeaderView el: $('#main-layout-header')
  new FooterView el: $('#main-layout-footer')
  if shouldShowRVARail()
    setupRail $('#recently-viewed-artworks')
    $('#main-layout-footer .mlf-upper').css('border', 'none')