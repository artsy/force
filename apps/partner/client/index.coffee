sd = require('sharify').data
Backbone = require 'backbone'
{ track } = require '../../../lib/analytics.coffee'
Profile = require '../../../models/profile.coffee'
Partner = require '../../../models/partner.coffee'
PartnerRouter = require './router.coffee'

module.exports.init = ->
  profile = new Profile sd.PROFILE
  partner = new Partner profile.get('owner')

  new PartnerRouter
    profile: profile
    partner: partner
    currentSection: sd.SECTION

  Backbone.history.start pushState: true

  partner.on 'sync', ->
    unless partner.get('claimed')
      track.impression 'Non-claimed partner page', id: partner.id
