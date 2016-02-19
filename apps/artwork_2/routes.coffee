{ extend } = require 'underscore'
qs = require 'qs'
metaphysics = require '../../lib/metaphysics'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... banner
      ... images
      ... actions
      ... metadata
      ... inquiry
      ... auction
      ... highlights
      ... tabs
      ... artists
    }
  }
  #{require './components/banner/query'}
  #{require './components/images/query'}
  #{require './components/actions/query'}
  #{require './components/metadata/query'}
  #{require './components/inquiry/query'}
  #{require './components/auction/query'}
  #{require './components/highlights/query'}
  #{require './components/tabs/query'}
  #{require './components/artists/query'}
"""

helpers = extend [
  {}
  metadata: require './components/metadata/helpers'
  auction: require './components/auction/helpers'
  artists: require './components/artists/helpers'
]...

@index = (req, res, next) ->
  send = query: query, variables: req.params

  if req.query.query?
    get = extend {}, send, variables: JSON.stringify send.variables
    return res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

  metaphysics send
    .then (data) ->
      extend res.locals.helpers, helpers
      res.render 'index', data
    .catch next
