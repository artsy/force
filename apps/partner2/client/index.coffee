sd = require('sharify').data
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
Profile = require '../../../models/profile.coffee'
Partner = require '../../../models/partner.coffee'
PartnerRouter = require './router.coffee'

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
