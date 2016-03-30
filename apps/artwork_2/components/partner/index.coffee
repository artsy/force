{ extend } = require 'underscore'
{ PARTNER } = require('sharify').data
metaphysics = require '../../../../lib/metaphysics.coffee'
helpers = require './helpers.coffee'
template = -> require('./index.jade') arguments...

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... partner
    }
  }
  #{require './query.coffee'}
"""

module.exports = ->
  $el = $('.js-artwork-partner')

  metaphysics query: query, variables: id: PARTNER.artwork.id
    .then (data) ->
      $el.replaceWith template(extend data, helpers: partner: helpers)

    .then ->
      # TODO: Initialize contact/follow buttons
