{ extend, map } = require 'underscore'
{ CLIENT } = require('sharify').data
metaphysics = require '../../../lib/metaphysics.coffee'
exec = require '../lib/exec.coffee'
templates =
  fold: -> require('./fold.jade') arguments...
  footer: -> require('./footer.jade') arguments...

helpers = extend [
  {}
  artist_artworks: require '../components/artist_artworks/helpers.coffee'
  auction_artworks: require '../components/auction_artworks/helpers.coffee'
  partner: require '../components/partner/helpers.coffee'
  related_artworks: require '../components/related_artworks/helpers.coffee'
  show_artworks: require '../components/show_artworks/helpers.coffee'
]...

module.exports.init = ->
  exec [
    require '../components/actions/index.coffee'
    require '../components/additional_info/index.coffee'
    require '../components/auction/index.coffee'
    require '../components/artists/index.coffee'
    require '../components/banner/index.coffee'
    require '../components/commercial/index.coffee'
    require '../components/images/index.coffee'
    require '../components/metadata/index.coffee'
  ]

  { query, init } = switch CLIENT.context
    when 'ArtworkContextAuction'
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... partner
              ... auction_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/auction_artworks/query.coffee'}
        """
      init: [
          require '../components/partner/index.coffee'
          require '../components/auction_artworks/index.coffee'
        ]

    when 'ArtworkContextFair'
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... fair_artworks
              ... partner
              ... related_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/fair_artworks/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      init: [
          require '../components/fair_artworks/index.coffee'
          require '../components/partner/index.coffee'
          require '../components/related_artworks/index.coffee'
        ]

    when 'ArtworkContextPartnerShow'
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... partner
              ... show_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/show_artworks/query.coffee'}
        """
      init: [
          require '../components/partner/index.coffee'
          require '../components/show_artworks/index.coffee'
        ]

    # when 'ArtworkContextSale' # Unimplemented (loads default fold content)
    #

    else
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... artist_artworks
              ... partner
              ... related_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/artist_artworks/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      init: [
          require '../components/artist_artworks/index.coffee'
          require '../components/partner/index.coffee'
          require '../components/related_artworks/index.coffee'
        ]

  metaphysics query: query, variables: id: CLIENT.id
    .then (data) ->
      for key, template of templates
        $(".js-artwork-#{key}")
          .html template extend data,
            helpers: helpers

      exec init
