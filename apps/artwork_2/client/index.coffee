{ extend } = require 'underscore'
{ CLIENT } = require('sharify').data
metaphysics = require '../../../lib/metaphysics.coffee'
template = -> require('./index.jade') arguments...

exec = (fns) ->
  for fn in fns
    try
      fn()
    catch err
      console.error err

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... partner
      ... artist_artworks
    }
  }
  #{require '../components/partner/query.coffee'}
  #{require '../components/artist_artworks/query.coffee'}
"""

helpers = extend [
  {}
  partner: require '../components/partner/helpers.coffee'
  artist_artworks: require '../components/artist_artworks/helpers.coffee'
]...

module.exports.init = ->
  exec [
    require '../components/actions/index.coffee'
    require '../components/auction/index.coffee'
    require '../components/artists/index.coffee'
    require '../components/banner/index.coffee'
    require '../components/collapsed_metadata/index.coffee'
    require '../components/images/index.coffee'
    require '../components/inquiry/index.coffee'
    require '../components/metadata/index.coffee'
    require '../components/tabs/index.coffee'
  ]

  $el = $('.js-artwork-overview-fold')

  metaphysics query: query, variables: CLIENT
    .then (data) ->
      $el.html template extend data,
        helpers: helpers

      exec [
        require '../components/partner/index.coffee'
        require '../components/artist_artworks/index.coffee'
      ]
