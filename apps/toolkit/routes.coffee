_ = require 'underscore'
sd = require('sharify').data
request = require 'superagent'
{ MAILCHIMP_KEY, TOOLKIT_LIST } = require '../../config'


@index = (req, res) ->
  res.render 'index'

@form = (req, res, next) ->
  request.post('https://us1.api.mailchimp.com/2.0/lists/subscribe')
    .send(
      apikey: MAILCHIMP_KEY
      id: TOOLKIT_LIST
      email: email: req.body.email
      send_welcome: true
      merge_vars:
        MMERGE1: req.body.fname
        MMERGE2: req.body.lname
        MMERGE3: 'Opt-in (artsy.net)'
      double_optin: false
      send_welcome: true
    ).end (err, response) ->
      res.send(success: true)