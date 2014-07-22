_ = require 'underscore'
Page = require '../../models/page'
fs = require 'fs'

@index = (req, res, next) ->
  fs.readFile __dirname + '/content.json', (err, json) ->
    return next(err) if err
    try
      data = JSON.parse(json.toString())
      res.render 'index', data
    catch e
      next e