_ = require 'underscore'
typeMap =
  artists: 'artist'
  genes: 'gene'
  galleries: 'profile'
  institutions: 'profile'
  profiles: 'profile'

# Add keys to this array when implemented
# and remove this mess when all are implemented
implemented = ['profile']

module.exports.following = (req, res, next) ->
  if (route = req.params.type) in _.keys(typeMap)
    kind = res.locals.sd.KIND = typeMap[route] or 'artist'
    if _.contains implemented, kind
      return res.redirect "/log_in?redirect-to=#{encodeURIComponent(req.url)}" unless req.user
      res.render 'index', type: route
    else
      res.render 'placeholder'
  else
    next()

module.exports.favorites = (req, res) ->
  res.render 'placeholder'
