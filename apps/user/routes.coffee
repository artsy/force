_           = require 'underscore'
UserEdit    = require './models/user_edit.coffee'
ProfileEdit = require './models/profile_edit.coffee'
Profile     = require '../../models/profile.coffee'

@refresh = (req, res) ->
  return res.redirect("/") unless req.user
  req.user.fetch
    error  : res.backboneError
    success: ->
      req.login req.user, (error) ->
        if (error)
          next error
        else
          res.json req.user.attributes

@settings = (req, res) ->
  return res.redirect("/") unless req.user

  user = new UserEdit req.user.attributes
  editAccountIsActive = if _.contains(req.url, '/user') then 'is-active' else null
  editProfileIsActive = if _.contains(req.url, '/profile') then 'is-active' else null
  activeForm = if _.contains(req.url, '/user') then "settings-account-active" else "settings-profile-active"
  profile = new Profile()

  render = _.after 2, ->
    res.locals.sd.PROFILE = profile
    res.locals.sd.USER_EDIT = user
    res.render './templates/settings.jade',
      user               : user
      profile            : profile
      profileEdit        : new ProfileEdit profile.attributes
      editAccountIsActive: editAccountIsActive
      editProfileIsActive: editProfileIsActive

  # Fetching here gets all current user properties, as is, req.user
  # only has :public fields. Also note that UserEdit inherits
  # CurrentUser's override of sync to add the access_token data param
  user.fetch
    error  : res.backboneError
    success: ->
      user.fetchAuthentications
        data:
          access_token: user.get 'accessToken'
        success: render
        error: res.backboneError

      profile.set 'id', req.user.get 'default_profile_id'
      profile.fetch
        data:
          access_token: user.get 'accessToken'
        success: render
        error: res.backboneError

@delete = (req, res) ->
  return res.redirect("/") unless req.user and not req.user.isAdmin()
  res.locals.sd.USER = req.user
  res.render './templates/delete.jade',
    user: req.user
