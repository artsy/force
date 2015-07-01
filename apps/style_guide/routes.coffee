_ = require 'underscore'
fs = require 'graceful-fs'
{ resolve } = require 'path'
sections = require './sections'
colors = require '../../components/stylus_lib/colors.json'
typeSizes = require '../../components/stylus_lib/type_sizes.json'

@index = (req, res) ->
  res.redirect "/style-guide/#{sections[0]}"

@section = (req, res, next) ->
  if _.contains(sections, req.params.section) or req.params.section is 'stage'
    res.render req.params.section, sections: sections, colors: colors, typeSizes: typeSizes
  else
    err = new Error 'Not Found'
    err.status = 404
    next err
