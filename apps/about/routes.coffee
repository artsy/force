_ = require 'underscore'
twilio = require 'twilio'
{ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, IPHONE_APP_COPY } = require '../../config'
cache = require '../../lib/cache'
resizer = require '../../components/resizer'
JSONPage = require '../../components/json_page'

@index = (req, res, next) ->
  page = new JSONPage name: 'about'
  page.get (err, data) ->
    return next err if err

    nav = _.keys(sections = data.sections).sort (a, b) ->
      sections[a].position > sections[b].position

    res.render 'index', _.extend {}, data, resizer, nav: nav

@sendSMS = (req, res ,next) ->
  twilioClient = new twilio.RestClient TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
  to = req.param('to').replace /[^\d\+]/g, ''
  cache.get "sms/iphone/#{to}", (err, cachedData) ->
    return res.json 400, { msg: 'Download link has already been sent to this number.' } if cachedData
    twilioClient.sendSms
      to: to
      from: TWILIO_NUMBER
      body: IPHONE_APP_COPY
    , (err, data) ->
      return res.json err.status or 400, { msg: err.message } if err
      cache.set "sms/iphone/#{to}", new Date().getTime().toString(), 600
      res.send 201, { msg: "success", data: data }
