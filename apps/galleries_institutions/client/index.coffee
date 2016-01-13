Backbone = require 'backbone'
PartnersView = require './routes/index.coffee'
FilterParams = require '../components/filters/partners_filter_params.coffee'
qs = require 'qs'
{ parse } = require 'url'

module.exports = ->
  params = new FilterParams _.extend qs.parse(parse(window.location.search).query),
    type: if sd.PARTNERS_ROOT is 'galleries' then 'gallery' else 'institution',

  new PartnersView params: params
