sd = require('sharify').data
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks'
Profile = require '../../../models/profile'
Partner = require '../../../models/partner'
PartnerRouter = require './router'

module.exports.init = ->
  profile = new Profile sd.PROFILE
  partner = profile.related().owner

  new PartnerRouter
    profile: profile
    partner: partner
    currentSection: sd.SECTION

  Backbone.history.start pushState: true

  partner.on 'sync', ->
    unless partner.get('claimed')
      analyticsHooks.trigger 'partner:non-claimed', id: partner.id
