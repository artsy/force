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
    }
  }
  #{require './components/banner/query'}
  #{require './components/images/query'}
  #{require './components/actions/query'}
  #{require './components/metadata/query'}
"""

helpers = extend {},
  require './components/metadata/helpers'

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
