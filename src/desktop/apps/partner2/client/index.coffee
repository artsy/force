sd = require('sharify').data
Backbone = require 'backbone'
{ Profile } = require '../../../models/profile'
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
      window.analytics.track(
        "Non-claimed partner page",
        {
          id: partner.id,
          nonInteraction: 1
        }
      )
