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
  getJSON (err, data) ->
    return next err if err
    res.locals.sd.DATA = data
    res.render 'edit'