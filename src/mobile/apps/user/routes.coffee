CurrentUser = require '../../models/current_user'

module.exports.refresh = (req, res, next) ->
  user = req.user
  return res.redirect("/") unless user

  user
    .fetch()
    .then ->
      req.login user, (error) ->
        return next error if error?
        res.json user.attributes
    .catch next

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
