sd              = require('sharify').data
Backbone        = require 'backbone'
Profile         = require '../../../models/profile.coffee'
PartnerRouter   = require './router.coffee'

module.exports.init = ->
  new PartnerRouter
    profile: new Profile sd.PROFILE
    currentSection: sd.SECTION
    
  Backbone.history.start pushState: true
