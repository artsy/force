FairHeaderView = require './header.coffee'
globalClientSetup = require '../../../lib/global_client_setup.coffee'
FooterView = require '../../main_layout/footer/view.coffee'
lightDetector = require '../../light_detector/index.coffee'
FairNavView = require './nav.coffee'
imagesLoaded = require 'imagesloaded'

module.exports = (options) =>
  globalClientSetup()

  { fair, model } = options

  new FairHeaderView el: $('.fair-layout-header'), model: model, fair: fair
  new FairNavView el: $('.fair-layout-nav'), model: model, fair: fair

  # check for feature image light/dark class
  if $('.feature-image').length
    $('.feature-image').imagesLoaded ->
      lightDetector
        targets: '.fair-overview-top, .fair-layout-header, .fair-layout-nav'
        backgroundClass: '.feature-image'
        imageUrl: model.coverImage().imageUrl('wide')
