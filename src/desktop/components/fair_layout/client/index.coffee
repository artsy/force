FairHeaderView = require './header.coffee'
{ globalClientSetup } = require '../../../lib/global_client_setup'
FooterView = require '../../main_layout/footer/view.coffee'
lightDetector = require '../../light_detector/index.coffee'
FairNavView = require './nav.coffee'
{ triggerMarketingModal } = require '../../marketing_signup_modal/triggerMarketingModal.ts'

module.exports = (options) ->
  globalClientSetup()
  { fair, model } = options

  new FairHeaderView el: $('.fair-layout-header'), model: model, fair: fair
  new FairNavView el: $('.fair-layout-nav'), model: model, fair: fair
  triggerMarketingModal(true)

  # check for feature image light/dark class
  if $('.feature-image').length
    lightDetector
      targets: '.fair-overview-top, .fair-layout-header, .fair-layout-nav'
      backgroundClass: '.feature-image'
      imageUrl: model.coverImage().imageUrl('wide')
