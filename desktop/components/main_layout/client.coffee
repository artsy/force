globalClientSetup = require '../../lib/global_client_setup'
HeaderView = require './header/view'
FooterView = require './footer/view'
MarketingSignupModal = require '../marketing_signup_modal/index'

module.exports = ->
  globalClientSetup()
  new HeaderView el: $('#main-layout-header')
  new FooterView el: $('#main-layout-footer')
  new MarketingSignupModal
