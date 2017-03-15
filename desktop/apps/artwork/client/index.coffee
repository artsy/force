{ extend, map, compact } = require 'underscore'
{ CLIENT } = require('sharify').data
{ setCookie } = require '../../../components/recently_viewed_artworks/index.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'
CurrentUser = require '../../../models/current_user.coffee'
exec = require '../lib/exec.coffee'
fold = -> require('./fold.jade') arguments...
footer = -> require('./footer.jade') arguments...

helpers = extend [
  {}
  artist_artworks: require '../components/artist_artworks/helpers.coffee'
  auction_artworks: require '../components/auction_artworks/helpers.coffee'
  partner: require '../components/partner/helpers.coffee'
  related_artworks: require '../components/related_artworks/helpers.coffee'
  show_artworks: require '../components/show_artworks/helpers.coffee'
  partner_artworks: require '../components/partner_artworks/helpers.coffee'
]...

sharedInit = [
  require '../components/actions/index.coffee'
  require '../components/additional_info/index.coffee'
  require '../components/auction/index.coffee'
  require '../components/artists/index.coffee'
  require '../components/banner/index.coffee'
  require '../components/commercial/index.coffee'
  require '../components/images/index.coffee'
  require '../components/metadata/index.coffee'
  require '../components/doge/index.coffee'
  require '../components/skrillex/index.coffee'
]

module.exports =
  setup: setup = (context = {}) ->
    if context.__typename is 'ArtworkContextAuction'
      query: """
          query artwork(
            $id: String!,
            $isClosed: Boolean!,
            $auctionId: ID,
            $saleSize: Int = 4,
            $saleSort: SaleSorts = CREATED_AT_ASC
          ) {
            artwork(id: $id) {
              ... partner
              ... auction_artworks @skip(if: $isClosed)
              ... artist_artworks @include(if: $isClosed)
              ... related_artworks @include(if: $isClosed)
            }

            ... followed_artist_ids @skip(if: $isClosed)

            sales(size: $saleSize, sort: $saleSort) {
              ... current_auctions
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require('../components/auction_artworks/query.coffee').auction_artworks}
          #{require('../components/auction_artworks/query.coffee').followed_artist_ids(CurrentUser.orNull())}
          #{require('../components/current_auctions/query.js').default}
          #{require '../components/artist_artworks/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      variables:
        isClosed: context.is_closed
        auctionId: sd.AUCTION.id,


      init: compact [
          require '../components/partner/index.coffee'
          require '../components/auction_artworks/index.coffee' unless context.is_closed
          require('../components/current_auctions/index.jsx').default unless context.is_closed
          require '../components/artist_artworks/index.coffee' if context.is_closed
          require '../components/related_artworks/index.coffee' if context.is_closed
          require '../components/related_artists/index.coffee'
        ]

    else if context.__typename is 'ArtworkContextFair'
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... fair_artworks
              ... partner
              ... artist_artworks
              ... related_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/fair_artworks/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/artist_artworks/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      init: [
          require '../components/fair_artworks/index.coffee'
          require '../components/partner/index.coffee'
          require '../components/artist_artworks/index.coffee'
          require '../components/related_artworks/index.coffee'
          require '../components/related_artists/index.coffee'
        ]

    else if context.__typename is 'ArtworkContextPartnerShow'
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... partner
              ... show_artworks
              ... artist_artworks
              ... partner_artworks
              ... related_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/show_artworks/query.coffee'}
          #{require '../components/artist_artworks/query.coffee'}
          #{require '../components/partner_artworks/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      init: [
          require '../components/partner/index.coffee'
          require '../components/show_artworks/index.coffee'
          require '../components/artist_artworks/index.coffee'
          require '../components/partner_artworks/index.coffee'
          require '../components/related_artworks/index.coffee'
          require '../components/related_artists/index.coffee'
        ]

    else
      query: """
          query artwork($id: String!) {
            artwork(id: $id) {
              ... partner
              ... artist_artworks
              ... partner_artworks
              ... related_artworks
            }
          }
          #{require '../../../components/artwork_brick/query.coffee'}
          #{require '../components/partner/query.coffee'}
          #{require '../components/artist_artworks/query.coffee'}
          #{require '../components/partner_artworks/query.coffee'}
          #{require '../components/related_artworks/query.coffee'}
        """
      init: [
          require '../components/partner/index.coffee'
          require '../components/artist_artworks/index.coffee'
          require '../components/partner_artworks/index.coffee'
          require '../components/related_artworks/index.coffee'
          require '../components/related_artists/index.coffee'
        ]

  renderTemplates: renderTemplates = (data) ->
    for key, template of { fold: fold, footer: footer }
      $(".js-artwork-#{key}")
        .html template extend data,
          helpers: helpers
          user: CurrentUser.orNull()

  init: ->
    setCookie(CLIENT._id)
    exec sharedInit

    context = CLIENT.context or {}
    { query, init, variables } = setup(context)

    return unless query? and init?
    variables ?= {}
    metaphysics {
      query: query,
      variables: extend { id: CLIENT.id }, variables
      req: user: CurrentUser.orNull()
    }
      .then (data) ->
        renderTemplates(data)
        exec init, data
