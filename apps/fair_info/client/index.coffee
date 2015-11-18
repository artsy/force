FairInfoVisitorsView = require './visitors.coffee'
Fair = require '../../../models/fair.coffee'
sd = require('sharify').data

module.exports.init = ->
  new FairInfoVisitorsView
    fair: new Fair sd.FAIR
    el: $('.fair-info2-body')