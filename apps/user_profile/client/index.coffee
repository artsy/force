sd = require('sharify').data
Profile = require '../../../models/profile.coffee'
UserProfileView = require './user_profile.coffee'

module.exports.init = ->
  new UserProfileView
    model: new Profile sd.PROFILE
    el: $('#profile')
