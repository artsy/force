@refresh = (req, res, next) ->
  user = req.user

  return res.redirect '/' unless user

  user
    .fetch()
    .then ->
      req.login user, (err) ->
        return next err if err?
        res.json user.attributes

    .catch next

@settings = (req, res, next) ->
  user = req.user

  return res.redirect "/log_in?redirect_uri=#{req.url}" unless user
  return res.redirect '/' if req.url is '/user/delete' and user.isAdmin()

  user.fetch()
    .then ->
      user.related().authentications.fetch data: access_token: user.get 'accessToken'

    .then ->
      res.locals.sd.USER = user.toJSON()

      # HTTP cache headers to prevent browser caching
      res.set 'Cache-Control', 'private, no-cache, no-store, max-age=0'
      res.set 'Pragma', 'no-cache'
      res.set 'Expires', '0'

      res.render 'index', user: user

    .catch next
