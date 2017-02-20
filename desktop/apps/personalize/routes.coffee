_ = require 'underscore'

@index = (req, res) ->
  if req.user?
    req.user.fetch
      success: (model, response, options) ->
        res.locals.sd.CURRENT_USER =
          _.extend(response, res.locals.sd.CURRENT_USER)
        res.render 'template'
  else
    res.redirect "/log_in?redirect_uri=#{encodeURIComponent(req.url)}"
