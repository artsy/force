{ extend } = require 'underscore'
{ PARTNER } = require('sharify').data
helpers = require './helpers.coffee'
inquire = require '../../lib/inquire.coffee'
follow = require '../../lib/follow.coffee'
template = -> require('./index.jade') arguments...

module.exports =
  query:
    name: 'partner'
    query: require './query.coffee'

  init: (data) ->
    $el = $('.js-artwork-partner')
    $el.replaceWith $el = $(template(extend data, helpers: partner: helpers))

    $el.find('.js-artwork-partner-contact').click (e) ->
      e.preventDefault()

      $this = $(this)
      $this.attr 'data-state', 'loading'

      inquire PARTNER.artwork.id
        .then ->
          $this.attr 'data-state', null
        .catch ->
          $this.attr 'data-state', 'error'

    follow $el.find('.js-artwork-partner-follow')
