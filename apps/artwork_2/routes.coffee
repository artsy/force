{ extend } = require 'underscore'
metaphysics = require '../../lib/metaphysics'

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... actions
      ... artists
      ... auction
      ... banner
      ... collapsed_metadata
      ... deep_zoom
      ... highlights
      ... images
      ... inquiry
      ... meta
      ... metadata
      ... tabs
    }
  }
  #{require './components/actions/query'}
  #{require './components/artists/query'}
  #{require './components/auction/query'}
  #{require './components/banner/query'}
  #{require './components/collapsed_metadata/query'}
  #{require './components/deep_zoom/query'}
  #{require './components/highlights/query'}
  #{require './components/images/query'}
  #{require './components/inquiry/query'}
  #{require './components/meta/query'}
  #{require './components/metadata/query'}
  #{require './components/tabs/query'}
"""

helpers = extend [
  {}
  actions: require './components/actions/helpers'
  artists: require './components/artists/helpers'
  auction: require './components/auction/helpers'
  banner: require './components/banner/helpers'
  collapsed_metadata: require './components/collapsed_metadata/helpers'
  highlights: require './components/highlights/helpers'
  metadata: require './components/metadata/helpers'
  partner: require './components/partner/helpers'
  tabs: require './components/tabs/helpers'
]...

bootstrap = ->
  require('./client/bootstrap') arguments...
  require('./components/actions/bootstrap') arguments...
  require('./components/auction/bootstrap') arguments...
  require('./components/banner/bootstrap') arguments...
  require('./components/deep_zoom/bootstrap') arguments...
  require('./components/inquiry/bootstrap') arguments...
  require('./components/partner/bootstrap') arguments...

@index = (req, res, next) ->
  send = query: query, variables: req.params

  return if metaphysics.debug req, res, send

  metaphysics send
    .then (data) ->
      extend res.locals.helpers, helpers
      bootstrap res.locals.sd, data
      res.render 'index', data

    .catch next
