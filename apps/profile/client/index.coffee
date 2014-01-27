sd                      = require('sharify').data
Profile                 = require '../../../models/profile.coffee'
UserProfileView         = require './user_profile.coffee'

module.exports.init = ->
  profile = new Profile sd.PROFILE
  # Todo: add views for other profile types.
  if profile.isUser()
    new UserProfileView
      model  : profile
      el     : $('#profile')
