{ SECURE_ARTSY_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require '../../config'
request = require 'superagent'

@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true, user: req.user?.toJSON() }

@loginToArtsy = (req, res) ->
  request
    .post("#{SECURE_ARTSY_URL}/api/v1/me/trust_token")
    .send(access_token: req.user.get 'accessToken')
    .end (trustRes) ->
      res.redirect "#{SECURE_ARTSY_URL}/users/sign_in?" +
                   "trust_token=#{trustRes.body.trust_token}&" +
                   "redirect_uri=#{APP_URL + req.get 'Referrer'}"

@logout = (req, res) ->
  req.logout()
  res.redirect '/'

@redirectAfterLogin = (req, res) ->
  res.redirect req.get('Referrer') or '/'