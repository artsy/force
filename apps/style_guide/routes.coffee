_ = require 'underscore'
sections = require './sections'
colors = require '../../components/stylus_lib/colors.json'

@index = (req, res) ->
  res.redirect "/style-guide/#{sections[0]}"

@section = (req, res, next) ->
  if _.contains(sections, req.params.section) or req.params.section is 'stage'
    res.render "#{req.params.section}.jade", sections: sections, colors: colors
  else
    err = new Error 'Not Found'
    err.status = 404
    next err
