{ MAILCHIMP_KEY } = require '../../config'
request = require 'superagent'

@subscribe = (req, res, next) ->
  request.post('https://us1.api.mailchimp.com/2.0/lists/subscribe')
    .send(
      apikey: MAILCHIMP_KEY
      id: req.body.listId
      email: email: req.body.email
      merge_vars: req.body.mergeVars
      double_optin: false
      send_welcome: false
    ).end (err, response) ->
      if (response.ok)
        res.send req.body
      else
        res.send(response.status, error: response.body.error)
