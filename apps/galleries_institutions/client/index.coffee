Backbone = require 'backbone'
SearchView = require './routes/search_view.coffee'
FilterParams = require '../components/partners_search/partners_filter_params.coffee'
qs = require 'qs'
{ parse } = require 'url'

module.exports = ->
  params = new FilterParams _.extend qs.parse(parse(window.location.search).query),
    type: if sd.PARTNERS_ROOT is 'galleries' then 'gallery' else 'institution',

  new SearchView params: params
