_ = require 'underscore'
Page = require '../../models/page'
fs = require 'fs'

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