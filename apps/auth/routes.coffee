@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true }

@logout = (req, res) ->
  req.logout()
  res.redirect '/'

@redirectAfterLogin = (req, res) ->
  res.redirect req.body['redirect-to'] or req.session.signupReferrer or '/'
