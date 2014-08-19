_ = require 'underscore'
Page = require '../../models/page'
knox = require 'knox'
request = require 'superagent'
url = require 'url'
twilio = require 'twilio'
{ S3_KEY, S3_SECRET, APPLICATION_NAME, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER, IPHONE_APP_COPY } = require '../../config.coffee'
client = null

CONTENT_PATH = '/about/content.json'

getJSON = (callback) ->
  request.get(
    "http://#{APPLICATION_NAME}.s3.amazonaws.com#{CONTENT_PATH}"
  ).end (err, res) ->
    return callback err if err
    try
      callback null, JSON.parse res.text
    catch e
      callback new Error "Invalid JSON " + e

@initClient = ->
  client = knox.createClient
    key: S3_KEY
    secret: S3_SECRET
    bucket: APPLICATION_NAME

@index = (req, res, next) ->
  getJSON (err, data) ->
    return next err if err
    res.render 'index', data

@adminOnly = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    res.status 403
    return next new Error "You must be logged in as an admin to edit the about page."
  else
    next()

@edit = (req, res, next) ->
  getJSON (err, data) ->
    return next err if err
    res.locals.sd.DATA = data
    res.render 'edit'

@upload = (req, res, next) ->
  buffer = new Buffer JSON.stringify req.body
  headers = { 'Content-Type': 'application/json', 'x-amz-acl': 'public-read' }
  client.putBuffer buffer, CONTENT_PATH, headers, (err, r) ->
    return next err if err
    res.send 200, { msg: "success" }

@sendSMS = (req, res ,next) ->
  twilioClient = new twilio.RestClient TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
  twilioClient.sendSms
    to: req.param('to')
    from: TWILIO_NUMBER
    body: IPHONE_APP_COPY
  , (err, data) ->
    return res.json err.status or 400, { msg: err.message } if err
    res.send { msg: "success", data: data }

@page = (id) ->
  (req, res) ->
    new Page(id: id).fetch
      cache: true
      success: (page) -> res.render 'page', page: page
      error: res.backboneError
