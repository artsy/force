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
  minCount: 7
  size: 10

  constructor: ({ @id }) ->
    @excludedIds = []
    @rails = {}
    @key = "artwork:#{@id}:rails"

  prepareParams: (options) ->
    defaults =
      exclude_artwork_ids: @excludedIds
      for_sale: true
      size: @size

    data = _.defaults options, defaults

  assignRail: (id, collection) ->
    if collection.length >= @minCount
      @rails[id] = collection
      @excludedIds = @excludedIds.concat _.pluck(collection, '_id')

  fetch: ({ @cache } = {}) ->
    Q.promise (resolve, reject) =>
      cache.getHash @key, {}, (err, data) =>
        if data and @cache
          return resolve @rails = data

        @fetchArtwork()
        .then ({ @artwork }) =>
          return resolve() if @artwork.partner.type is 'Institution'
          @excludedIds.push @artwork._id
          @fetchAuctionArtworks()
        .then =>
          @fetchShowArtworks()
        .then =>
          @fetchSimilarArtworks()
        .then =>
          @fetchArtistArtworks()
        .then =>
          @fetchPartnerArtworks()
        .then =>
          response =
            artwork: @artwork
            rails: @rails
          cache.setHash @key, response
          resolve response
        .catch reject
        .done()

  fetchAuctionArtworks: ->
    Q.promise (resolve) =>
      if @artwork.related?.__typename is 'RelatedSale'
        sale = new Sale @artwork.related
        sale.related().saleArtworks.fetchUntilEndInParallel
          success: (collection, response, options) =>
            collection.remove @artwork
            artworks = Artworks.fromSale collection
            if @artwork.related.auction_state is 'closed'
              @assignRail 'closed_auction_artworks', artworks.toJSON()
            else
              @assignRail 'current_auction_artworks', artworks.toJSON()
            resolve()
      else
        resolve()

  fetchShowArtworks: ->
    Q.promise (resolve) =>
      if @artwork.shows.length
        partner = new Partner id: @artwork.shows[0].partner.id
        show = new PartnerShow id: @artwork.shows[0].id
        show.set partner: partner
        show.related().artworks.fetch
          error: resolve
          success: (artworks, response) =>
            @assignRail 'show_artworks', artworks.toJSON()
            resolve()
      else
        resolve()

  fetchSimilarArtworks: ->
    @fetchFilterArtworks 'similar_artworks',
      gene_id: slugify(@artwork.category)
      artist_id: @artwork.artist.id
      size: 20

  fetchArtistArtworks: ->
    @fetchFilterArtworks 'artist_artworks',
      artist_id: @artwork.artist.id

  fetchPartnerArtworks: ->
    @fetchFilterArtworks 'partner_artworks',
      partner_id: @artwork.partner.id

  fetchFilterArtworks: (id, options)->
    Q.promise (resolve) =>
      artworks = new FilterArtworks []
      artworks.fetch
        data: @prepareParams options
        error: resolve
        success: (collection, response) =>
          @assignRail id, collection.toJSON()
          resolve()

  fetchArtwork: ->
    metaphysics
      variables: id: @id
      query: '
        query($id: String!) {
          artwork(id: $id){
            _id
            category
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
