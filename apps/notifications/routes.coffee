_ = require 'underscore'

@worksForYou = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user
  res.render 'index'