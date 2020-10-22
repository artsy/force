FairHeaderView = require './header.coffee'
{ globalClientSetup } = require '../../../lib/global_client_setup'
lightDetector = require '../../light_detector/index.coffee'
FairNavView = require './nav.coffee'
{ triggerMarketingModal } = require '../../marketing_signup_modal/triggerMarketingModal.ts'
{ Intent } = require "@artsy/cohesion"

module.exports = (options) ->
  globalClientSetup()
  { fair, model } = options

  new FairHeaderView el: $('.fair-layout-header'), model: model, fair: fair
  new FairNavView el: $('.fair-layout-nav'), model: model, fair: fair
  triggerMarketingModal(Intent.viewFair, true)

  # check for feature image light/dark class
  if $('.feature-image').length
    lightDetector
      targets: '.fair-overview-top, .fair-layout-header, .fair-layout-nav'
      backgroundClass: '.feature-image'
      imageUrl: model.coverImage().imageUrl('wide')
