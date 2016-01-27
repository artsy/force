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
    }
  }
  #{require './components/banner/query'}
  #{require './components/images/query'}
  #{require './components/actions/query'}
  #{require './components/metadata/query'}
  #{require './components/inquiry/query'}
  #{require './components/auction/query'}
"""

helpers = extend [
  {}
  require './components/metadata/helpers'
  require './components/auction/helpers'
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
