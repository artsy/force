_ = require 'underscore'
kinds = require './kinds'

@follows = (req, res, next) ->
  return res.redirect "/log_in?redirect_uri=#{encodeURIComponent(req.url)}" unless req.user
  if (route = req.params.type) in _.keys(kinds)
    res.locals.sd.KIND = kinds[route] or 'artist'
    res.render 'follows', type: route
  else
    next()

@favorites = (req, res) ->
  return res.redirect "/log_in?redirect_uri=#{encodeURIComponent(req.url)}" unless req.user
  res.render 'favorites', profileId: req.user.get('default_profile_id')
