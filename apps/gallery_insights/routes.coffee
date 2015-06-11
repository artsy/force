request = require 'superagent'
sd = require('sharify').data

@index = (req, res) ->
  email = res.locals.sd.CURRENT_USER?.email
  subscribed email, (cb) ->
    res.locals.sd.MAILCHIMP_SUBSCRIBED = cb
    console.log cb
    res.render 'index'

subscribed = (email, callback) ->
  request.get('https://us1.api.mailchimp.com/2.0/lists/member-info')
    .query(
      apikey: sd.MAILCHIMP_KEY
      id: '95ac2900c4'
    ).query("emails[0][email]=#{email}").end (err, response) ->
      callback response.body.success_count is 1