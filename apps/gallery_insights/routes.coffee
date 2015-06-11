@index = (req, res) ->
  res.render 'index'

@form = (req, res, next) ->
  request.post('https://us1.api.mailchimp.com/2.0/lists/subscribe')
    .send(
      apikey: sd.MAILCHIMP_KEY
      id: '95ac2900c4'
      email: email: req.body.email
      send_welcome: true
      merge_vars:
        MMERGE1: req.body.fname
        MMERGE2: req.body.lname
        MMERGE3: 'Opt-in (artsy.net)'
      double_optin: false
      send_welcome: true
    ).end (err, response) ->
      if (response.ok)
        res.send req.body
      else
        res.send(response.status, response.body.error)

subscribed = (email, callback) ->
  request.get('https://us1.api.mailchimp.com/2.0/lists/member-info')
    .query(
      apikey: sd.MAILCHIMP_KEY
      id: '95ac2900c4'
    ).query("emails[0][email]=#{email}").end (err, response) ->
      callback response.body.success_count is 1