_ = require 'underscore'
knox = require 'knox'
url = require 'url'
request = require 'superagent'
client = null
{ S3_KEY, S3_SECRET, APPLICATION_NAME } = require '../../config.coffee'
{ crop } = require '../../components/resizer'

getJSON = (url, callback) ->
  CONTENT_PATH = getContentPath(url)
  request.get(
    "http://#{APPLICATION_NAME}.s3.amazonaws.com#{CONTENT_PATH}"
  )
  .on('error', callback)
  .end (err, res) ->
    try
      callback null, JSON.parse res.text
    catch e
      callback new Error "Invalid JSON " + e

getContentPath = (url) ->
  if url.match 'gallery-partnerships'
    return '/gallery-partnerships/content.json'
  else
    return '/institution-partnerships/content.json'

@initClient = ->
  client = knox.createClient
    key: S3_KEY
    secret: S3_SECRET
    bucket: APPLICATION_NAME

@index = (req, res, next) ->
  getJSON req.url, (err, data) ->
    return next err if err
    res.render 'index', _.extend data, crop: crop, path: req.url

@adminOnly = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    res.status 403
    next new Error "You must be logged in as an admin to edit this partnerships page."
  else
    next()

@edit = (req, res, next) ->
  getJSON( req.url, (err, data) ->
    return next err if err
    res.locals.sd.DATA = data
    res.render 'edit', path: req.url
  )

@upload = (req, res, next) ->
  @req = req
  buffer = new Buffer JSON.stringify req.body
  headers = { 'Content-Type': 'application/json', 'x-amz-acl': 'public-read' }
  client.putBuffer buffer, getContentPath(req.url), headers, (err, r) ->
    return next err if err
    res.send 200, { msg: "success" }
