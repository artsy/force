_ = require 'underscore'
knox = require 'knox'
url = require 'url'
request = require 'superagent'
client = null
{ S3_KEY, S3_SECRET, APPLICATION_NAME } = require '../../config.coffee'
{ crop } = require '../../components/resizer'
SplitTest = require '../../components/split_test/server_split_test'
runningTests = require '../../components/split_test/running_tests'

getJSON = (callback) ->
  if @req.url.match 'gallery-partnerships'
    CONTENT_PATH = '/gallery-partnerships/content.json'
  else
    CONTENT_PATH = '/institution-partnerships/content.json'
  request.get(
    "http://#{APPLICATION_NAME}.s3.amazonaws.com#{CONTENT_PATH}"
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
  @req = req
  testConfig = runningTests.gallery_partnerships_apply
  if _.contains _.keys(testConfig.outcomes), req.query.mode
    test = new SplitTest req, res, testConfig
    test.set req.query.mode
    res.locals.sd[testConfig.key.toUpperCase()] = req.query.mode

  getJSON (err, data) ->
    return next err if err
    res.render 'index', _.extend data, crop: crop

@adminOnly = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    res.status 403
    next new Error "You must be logged in as an admin to edit this partnerships page."
  else
    next()

@edit = (req, res, next) ->
  @req = req
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
