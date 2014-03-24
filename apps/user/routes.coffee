_        = require 'underscore'
UserEdit = require '../../models/user_edit.coffee'
Profile  = require '../../models/profile.coffee'

@settings = (req, res) ->
  return res.redirect("/") unless req.user

  user = new UserEdit req.user.attributes
  editAccountIsActive = if _.contains(req.url, '/user') then 'is-active' else null
  editProfileIsActive = if _.contains(req.url, '/profile') then 'is-active' else null
  activeForm = if _.contains(req.url, '/user') then "settings-account-active" else "settings-profile-active"
  profile = new Profile { id: req.user.get('default_profile_id') }

  render = _.after 3, ->
    res.locals.sd.PROFILE = profile
    res.locals.sd.USER_EDIT = user
    res.render './templates/settings.jade',
      user               : user
      profile            : profile
      editAccountIsActive: editAccountIsActive
      editProfileIsActive: editProfileIsActive

  # Fetching here gets all current user properties, as is,
  # req.user only has :public fields. Also note that CurrentUser
  # overrides sync to add the access_token data param
  user.fetch
    success: render
    error: res.backboneError

  user.fetchAuthentications
    data:
      access_token: user.get 'accessToken'
    success: render
    error: res.backboneError

  profile.fetch
    data:
      access_token: user.get 'accessToken'
    success: render
    error: res.backboneError
