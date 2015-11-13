FairHeaderView = require './header.coffee'
globalClientSetup = require '../../../lib/global_client_setup.coffee'
FooterView = require '../../main_layout/footer/view.coffee'
FairNavView = require './nav.coffee'

module.exports = (options) =>
  globalClientSetup()
  { fair, model } = options
  new FairHeaderView el: $('.fair-layout-header'), model: model, fair: fair
  new FairNavView el: $('.fair-layout-nav'), model: model, fair: fair
