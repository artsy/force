_ = require 'underscore'
knox = require 'knox'
url = require 'url'
request = require 'superagent'
client = null
{ S3_KEY, S3_SECRET, APPLICATION_NAME } = require '../../config'
{ crop } = require '../../components/resizer'

getJSON = (subject, callback) ->
  request.get(
    "http://#{APPLICATION_NAME}.s3.amazonaws.com/#{subject}-partnerships/content.json"
  )
  .on('error', callback)
  .end (err, res) ->
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
  res.locals.subject = res.locals.sd.SUBJECT =  req.params.subject

  getJSON res.locals.subject, (err, data) ->
    return next err if err
    res.render 'index', _.extend data, crop: crop, path: req.url

@adminOnly = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    res.status 403
    next new Error "You must be logged in as an admin to edit this partnerships page."
  else
    next()

@edit = (req, res, next) ->
  res.locals.subject = res.locals.sd.SUBJECT =  req.params.subject

  getJSON res.locals.subject, (err, data) ->
    return next err if err
    res.locals.sd.DATA = data
    res.render 'edit', path: req.url

@upload = (req, res, next) ->
  res.locals.subject = res.locals.sd.SUBJECT =  req.params.subject
  buffer = new Buffer JSON.stringify req.body
  headers = { 'Content-Type': 'application/json', 'x-amz-acl': 'public-read' }
  contentPath = "#{res.locals.subject}-partnerships/content.json"
  client.putBuffer buffer, contentPath, headers, (err, r) ->
    return next err if err
    res.send 200, { msg: "success" }

@mktoABTest = (req, res) ->
  a = '/gallery-partnerships?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-a'
  b = 'http://pages.artsy.net/gallery-partnerships.html?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-b'
  res.redirect if Boolean(_.random 1) then a else b
