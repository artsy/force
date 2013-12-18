@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true, user: req.user?.toJSON() }

@logout = (req, res) ->
  req.logout()
  res.redirect '/'