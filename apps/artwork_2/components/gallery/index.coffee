{ extend } = require 'underscore'
{ GALLERY } = require('sharify').data
metaphysics = require '../../../../lib/metaphysics.coffee'
helpers = require './helpers.coffee'
template = -> require('./index.jade') arguments...

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... gallery
    }
  }
  #{require './query.coffee'}
"""

module.exports = ->
  $el = $('.js-artwork-gallery')

  metaphysics query: query, variables: id: GALLERY.artwork.id
    .then (data) ->
      $el.replaceWith template(extend data, helpers: gallery: helpers)

    .then ->
      # TODO: Initialize contact/follow buttons
