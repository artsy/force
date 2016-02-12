_ = require 'underscore'
{ slugify } = require 'underscore.string'
Q = require 'bluebird-q'
qs = require 'qs'
Backbone = require 'backbone'
cache = require '../../lib/cache'
metaphysics = require '../../lib/metaphysics'
Artworks = require '../../collections/artworks.coffee'
FilterArtworks = require '../../collections/filter_artworks'
Partner = require '../../models/partner'
Sale = require '../../models/sale'
PartnerShow = require '../../models/partner_show'
{ API_URL } = require('sharify').data

module.exports = class ArtworkRails
  minCount: 1
  size: 10
  railSizeMapping:
    show_artworks: 10,
    for_sale_artworks: 10,
    similar_artworks: 20,
    artist_artworks: 10,
    partner_artworks: 10

  constructor: ({ @id }) ->
    @alreadySeenIds = []
    @rails = {}
    @key = "artwork:#{@id}:rails"

  prepareParams: (options) ->
    defaults =
      sort: "-for_sale"
      size: @size

    data = _.defaults options, defaults

  filter: (responses) =>
    ids = [@id]
    _.map _.compact(responses), (obj) =>
      # obj is { id: ..., collection: ... }
      if (count = @railSizeMapping[obj.id])
        filteredArtworks = _.filter obj.collection, (artwork) => ! _.contains(ids, artwork._id)
        railArtworks = _.take(filteredArtworks, count)
        ids = ids.concat _.pluck railArtworks, '_id'
        obj.collection = railArtworks

      obj

  fetch: ({ @cache } = {}) ->
    Q.promise (resolve, reject) =>
      cache.getHash @key, {}, (err, data) =>
        if data and @cache
          return resolve @rails = data

        @fetchArtwork()
        .then ({ @artwork }) =>
          return resolve() if @artwork.partner.type is 'Institution'
          isInAuction = @artwork.related?.__typename is 'RelatedSale' and @artwork.related?.is_auction?
          isInCurrentOrUpcomingAuction = @artwork.related?.is_preview or @artwork.related?.is_open
          return resolve(in_auction: true) if isInAuction and isInCurrentOrUpcomingAuction
          Q.all [
            @fetchSimilarArtworks()        # fetch 21 (guaranteed 20 uniques)
            @fetchArtistArtworks()         # fetch 31 (guaranteed 10 uniques)
            @maybeFetchShowArtworks()      # fetch 41 (guaranteed 10 uniques)
            @maybeFetchForSaleArtworks()   # fetch 51 (guaranteed 10 uniques)
            @fetchPartnerArtworks()        # fetch 61 (guaranteed 10 uniques)
          ]
            .then (responses) =>
              @rails = _.reduce @filter(responses), (memo, obj) =>
                memo[obj.id] = obj.collection if obj? and obj.collection?.length > @minCount
                memo
              , {}

              response =
                artwork: @artwork
                rails: @rails
              cache.setHash @key, response
              resolve response

        .catch reject

  maybeFetchForSaleArtworks: ->
      if @artwork.is_for_sale
        Q.resolve()
      else
        @fetchFilterArtworks 'for_sale_artworks',
          artist_id: @artwork.artist.id
          for_sale: true
          size: 51

  maybeFetchShowArtworks: ->
    Q.promise (resolve) =>
      if @artwork.shows.length
        partner = new Partner id: @artwork.shows[0].partner.id
        show = new PartnerShow id: @artwork.shows[0].id
        show.set partner: partner
        show.related().artworks.fetch
          data: size: 41
          error: resolve
          success: (artworks, response) =>
            resolve id: 'show_artworks', collection: artworks.toJSON()
      else
        resolve()

  fetchSimilarArtworks: ->
    @fetchFilterArtworks 'similar_artworks',
      gene_id: slugify(@artwork.category)
      artist_id: @artwork.artist.id
      size: 21

  fetchArtistArtworks: ->
    @fetchFilterArtworks 'artist_artworks',
      artist_id: @artwork.artist.id
      size: 31

  fetchPartnerArtworks: ->
    @fetchFilterArtworks 'partner_artworks',
      partner_id: @artwork.partner.id
      size: 61

  fetchFilterArtworks: (id, options)->
    Q.promise (resolve) =>
      artworks = new FilterArtworks []
      artworks.fetch
        data: @prepareParams options
        error: resolve
        success: (collection, response) =>
          resolve id: id, collection: collection.toJSON()

  fetchArtwork: ->
    metaphysics
      variables: id: @id
      query: '
        query($id: String!) {
          artwork(id: $id){
            _id
            category
            is_for_sale
            artist {
              id
              name
            }
            shows {
              id
              name
              partner {
                id
              }
            }
            related{
              __typename
              ... on RelatedSale {
                id
                name
                start_at
                end_at
                sale_type
                auction_state
                is_auction
                is_preview
                is_open
              }
            }
            partner{
              id
              default_profile_id
              is_linkable
              type
              name
            }

          }
        }
        '
