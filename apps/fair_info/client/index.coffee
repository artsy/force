FairInfoVisitorsView = require './visitors.coffee'
FairInfoProgrammingView = require './programming.coffee'
Fair = require '../../../models/fair.coffee'
sd = require('sharify').data

module.exports.init = ->
  new FairInfoVisitorsView
    fair: new Fair sd.FAIR
    el: $('.fair-info2-body')

  new FairInfoProgrammingView
    fair: new Fair sd.FAIR
    el: $('fair-info-programming')