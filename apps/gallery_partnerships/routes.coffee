_       = require 'underscore'
knox    = require 'knox'
url     = require 'url'
request = require 'superagent'
client  = null
{ S3_KEY, S3_SECRET, APPLICATION_NAME } = require '../../config.coffee'

CONTENT_PATH = '/gallery-partnerships/content.json'

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
