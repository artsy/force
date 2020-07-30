Backbone = require 'backbone'
PartnersView = require './routes/index.coffee'
FilterParams = require '../components/parameters/filter_params.coffee'
qs = require 'qs'
url = require 'url'

module.exports = ->
  return if not (root = window.location.pathname.substring(1)) in ['galleries', 'institutions']
  params = new FilterParams _.extend qs.parse(url.parse(window.location.search).query), {
    type: if root is 'galleries' then 'gallery' else 'institution',
  }

  new PartnersView params: params, root: root, el: $('.galleries-institutions-page')

