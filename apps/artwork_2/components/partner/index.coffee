{ extend } = require 'underscore'
{ PARTNER } = require('sharify').data
metaphysics = require '../../../../lib/metaphysics.coffee'
Artwork = require '../../../../models/artwork.coffee'
helpers = require './helpers.coffee'
inquire = require '../../lib/inquire.coffee'
follow = require '../../lib/follow.coffee'
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
      $el.replaceWith $el = $(template(extend data, helpers: partner: helpers))

      $el.find('.js-artwork-partner-contact').click (e) ->
        e.preventDefault()
        ($this = $(this))
          .attr 'data-state', 'loading'
        inquire PARTNER.artwork.id
          .then ->
            $this.attr 'data-state', null

      followButton = follow $el.find('.js-artwork-partner-follow')

