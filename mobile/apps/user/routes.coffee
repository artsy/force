CurrentUser = require '../../models/current_user'

module.exports.refresh = (req, res) ->
  return res.redirect("/") unless req.user
  req.user.fetch
    error: res.backboneError
    success: ->
      req.login req.user, (error) ->
        if (error)
          next error
        else
          res.json req.user.attributes

module.exports.settings = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  user = new CurrentUser req.user.attributes

  # Fetching here gets all current user properties, as is, req.user
  # only has :public fields. Also note that UserEdit inherits
  # CurrentUser's override of sync to add the access_token data param
  user.fetch
    error: res.backboneError
    success: ->
      res.locals.sd.USER_EDIT = user
      res.render './templates/settings',
        user: user
