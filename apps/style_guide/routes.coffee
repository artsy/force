_ = require 'underscore'
fs = require 'graceful-fs'
{ resolve } = require 'path'
sections = require './sections'
colors = require '../../components/stylus_lib/colors.json'
{ Markdown } = require 'artsy-backbone-mixins'
mdToHtml = (string) ->
  Markdown.mdToHtml.apply { get: -> string }, [null, sanitize: false]

@index = (req, res) ->
  res.redirect "/style-guide/#{sections[0]}"

@logic = (req, res) ->
  md = fs.readFileSync(resolve(__dirname, 'logic.md'), 'utf8')
  res.render 'logic', html: mdToHtml(md), sections: sections

@section = (req, res, next) ->
  if _.contains(sections, req.params.section) or req.params.section is 'stage'
    res.render req.params.section, sections: sections, colors: colors
  else
    err = new Error 'Not Found'
    err.status = 404
    next err
