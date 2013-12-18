@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true }

@logout = (req, res) ->
  req.logout()
  res.redirect '/'

@redirectAfterSignUp = (req, res) ->
  location                    = req.body['redirect-to'] or req.session.signupReferrer or '/personalize/collect'
  req.session.signupReferrer  = null
  req.session.action          = null
  res.redirect location

@redirectAfterLogin = (req, res) ->
  res.redirect req.body['redirect-to'] or req.session.signupReferrer or '/'
