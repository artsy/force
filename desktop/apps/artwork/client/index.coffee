{ extend, map, compact } = require 'underscore'
{ AUCTION, CLIENT } = require('sharify').data
{ setCookie } = require '../../../components/recently_viewed_artworks/index'
metaphysics = require '../../../../lib/metaphysics'
CurrentUser = require '../../../models/current_user'
exec = require '../lib/exec'
fold = -> require('./fold.jade') arguments...
footer = -> require('./footer.jade') arguments...

helpers = extend [
  {}
  artist_artworks: require '../components/artist_artworks/helpers'
  auction_artworks: require '../components/auction_artworks/helpers'
  partner: require '../components/partner/helpers'
  related_artworks: require '../components/related_artworks/helpers'
  show_artworks: require '../components/show_artworks/helpers'
  partner_artworks: require '../components/partner_artworks/helpers'
]...

sharedInit = [
  require '../components/actions/index'
  require '../components/additional_info/index'
  require '../components/auction/index'
  require '../components/artists/index'
  require '../components/banner/index'
  require '../components/commercial/index'
  require '../components/images/index'
  require '../components/metadata/index'
  require '../components/doge/index'
  require '../components/skrillex/index'
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
          $saleSort: SaleSorts = TIMELY_AT_NAME_ASC
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
        #{require '../../../components/artwork_brick/query'}
        #{require '../components/partner/query'}
        #{require('../components/auction_artworks/query').auction_artworks}
        #{require('../components/auction_artworks/query').followed_artist_ids(CurrentUser.orNull())}
        #{require('../../../components/current_auctions/query.js').default}
        #{require '../components/artist_artworks/query'}
        #{require '../components/related_artworks/query'}
      """

      variables:
        isClosed: context.is_closed
        auctionId: sd.AUCTION.id

      init: compact [
          require '../components/partner/index'
          require '../components/auction_artworks/index' unless context.is_closed
          require('../../../components/current_auctions/index.jsx').default unless context.is_closed
          require '../components/artist_artworks/index' if context.is_closed
          require '../components/related_artworks/index' if context.is_closed
          require '../components/related_artists/index'
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
          #{require '../../../components/artwork_brick/query'}
          #{require '../components/fair_artworks/query'}
          #{require '../components/partner/query'}
          #{require '../components/artist_artworks/query'}
          #{require '../components/related_artworks/query'}
        """
      init: [
          require '../components/fair_artworks/index'
          require '../components/partner/index'
          require '../components/artist_artworks/index'
          require '../components/related_artworks/index'
          require '../components/related_artists/index'
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
          #{require '../../../components/artwork_brick/query'}
          #{require '../components/partner/query'}
          #{require '../components/show_artworks/query'}
          #{require '../components/artist_artworks/query'}
          #{require '../components/partner_artworks/query'}
          #{require '../components/related_artworks/query'}
        """
      init: [
          require '../components/partner/index'
          require '../components/show_artworks/index'
          require '../components/artist_artworks/index'
          require '../components/partner_artworks/index'
          require '../components/related_artworks/index'
          require '../components/related_artists/index'
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
          #{require '../../../components/artwork_brick/query'}
          #{require '../components/partner/query'}
          #{require '../components/artist_artworks/query'}
          #{require '../components/partner_artworks/query'}
          #{require '../components/related_artworks/query'}
        """
      init: [
          require '../components/partner/index'
          require '../components/artist_artworks/index'
          require '../components/partner_artworks/index'
          require '../components/related_artworks/index'
          require '../components/related_artists/index'
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
        renderTemplates(extend data, {
          auctionContextId: AUCTION && AUCTION.id
        })

        exec init, data
