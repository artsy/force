_ = require 'underscore'
UserEdit = require './models/user_edit.coffee'
Profile = require '../../models/profile.coffee'

@refresh = (req, res) ->
  return res.redirect("/") unless req.user
  req.user.fetch
    error: res.backboneError
    success: ->
      req.login req.user, (error) ->
        if (error)
          next error
        else
          res.json req.user.attributes

@settings = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  user = new UserEdit req.user.attributes
  activeForm = if _.contains(req.url, '/user') then "settings-account-active" else "settings-profile-active"
  profile = new Profile()

  render = _.after 2, ->
    res.locals.sd.PROFILE = profile
    res.locals.sd.USER_EDIT = user

    # HTTP cache headers to prevent browser caching
    res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    res.render './templates/index.jade',
      user: user
      profile: profile

  # Fetching here gets all current user properties, as is, req.user
  # only has:public fields. Also note that UserEdit inherits
  # CurrentUser's override of sync to add the access_token data param
  user.fetch
    error: res.backboneError
    success: ->
      user.fetchAuthentications
        data: access_token: user.get 'accessToken'
        success: render
        error: res.backboneError

      profile.set 'id', req.user.get 'default_profile_id'
      profile.fetch
        data: access_token: user.get 'accessToken'
        success: render
        error: res.backboneError

@delete = (req, res) ->
  return res.redirect("/") unless req.user and not req.user.isAdmin()
  res.locals.sd.USER = req.user
  res.render './templates/delete.jade', user: req.user
