_ = require 'underscore'
Page = require '../../models/page'
fs = require 'fs'
knox = require 'knox'
{ S3_KEY, S3_SECRET, S3_BUCKET } = require '../../config.coffee'

client = knox.createClient
  key: S3_KEY
  secret: S3_SECRET
  bucket: S3_BUCKET

getJSON = (callback) ->
  fs.readFile __dirname + '/content.json', (err, json) ->
    try
      data = JSON.parse(json.toString())
      callback null, data
    catch e
      callback e

@index = (req, res, next) ->
  getJSON (err, data) ->
    return next err if err
    res.render 'index', data

@edit = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    res.status 403
    return next new Error "You must be logged in as an admin to clear the cache."
  getJSON (err, data) ->
    return next err if err
    res.locals.sd.DATA = data
    res.render 'edit'

@upload = (req, res, next) ->
  client.put((str = JSON.stringify req.body),
    'Content-Length': str.length
    'Content-Type': 'application/json'
  ).on 'response', (res) ->
    return res.send 500, { msg: "fail" } if res.statusCode isnt 200
    res.send 200, { msg: "success" }