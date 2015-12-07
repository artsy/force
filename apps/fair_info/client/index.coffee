FairInfoVisitorsView = require './visitors.coffee'
FairInfoProgrammingView = require './programming.coffee'
FairInfoEventsView = require './events.coffee'
initFairLayout = require '../../../components/fair_layout/client/index.coffee'
Fair = require '../../../models/fair.coffee'
FairEvent = require '../../../models/fair_event.coffee'
Profile = require '../../../models/profile.coffee'
sd = require('sharify').data

module.exports.init = ->
  fair = new Fair sd.FAIR
  initFairLayout
    model: new Profile sd.PROFILE
    fair: fair

  new FairInfoVisitorsView
    fair: fair
    el: $('.fair-info2-body')

  new FairInfoProgrammingView
    fair: fair
    el: $('.fair-info-programming')

  new FairInfoEventsView
    fair: fair
    el: $('.fair-info-events')