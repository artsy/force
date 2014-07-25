_ = require 'underscore'
Page = require '../../models/page'
knox = require 'knox'
{ S3_KEY, S3_SECRET, S3_BUCKET } = require '../../config.coffee'

client = knox.createClient
  key: S3_KEY
  secret: S3_SECRET
  bucket: S3_BUCKET

CONTENT_PATH = '/about/content.json'

getJSON = (callback) ->
  client.getFile CONTENT_PATH, (err, res) ->
    return callback err if err
    json = ''
    res.on 'data', (chunk) -> json += chunk
    res.on 'end', ->
      try
        callback null, JSON.parse json.toString()
      catch e
        callback e

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
  headers = { 'Content-Type': 'application/json' }
  client.putBuffer buffer, CONTENT_PATH, headers, (err, r) ->
    return next err if err
    res.send 200, { msg: "success" }