_ = require 'underscore'
{ slugify } = require 'underscore.string'
Q = require 'bluebird-q'
qs = require 'qs'
Backbone = require 'backbone'
cache = require '../../lib/cache'
metaphysics = require '../../lib/metaphysics'
FilterArtworks = require '../../collections/filter_artworks'
Partner = require '../../models/partner'
PartnerShow = require '../../models/partner_show'
{ API_URL } = require('sharify').data

module.exports = class ArtworkRails
  rails: {}
  artwork: {}
  excludedIds: []
  minCount: 10
  maxCount: 25

  constructor: ({ @id }) ->
    @excludedIds = []
    @key = "artwork:#{@id}:rails"

  prepareParams: (options) ->
    defaults =
      exclude_artwork_ids: @excludedIds
      for_sale: true
      size: @minCount

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

        # fetch artwork
        # if theres an auction return sale_artworks also
          # if the auction is current, resolve with works
          # else add works to existing ids
        # if the work is in a fair, fetch all other works in the show (excluding existing works)
        # if the work is in a show, fetch all other works in the show (excluding existing works)
        # fetch works in the same category, if over 20 add works to rails and excluded ids
        # fetch works by artist, add to rails
        # fetch works by partner, add to rails

        @fetchArtwork()
        .then ({ @artwork }) =>
          @excludedIds.push @artwork._id
          @fetchAuctionArtworks()
        .then @fetchFairArtworks
        .then @fetchShowArtworks
        .then @fetchSimilarArtworks
        .then @fetchArtistArtworks
        .then @fetchPartnerArtworks
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
        if @artwork.related.auction_state is 'closed'
          @rails.closed_auction_artworks = @artwork.related.sale_artworks
          @excludedIds.concat _.chain(@artwork.related.sale_artworks).pick('artwork').pick('id').value()
        else
          @rails.current_auction_artwowrks = artwork.related.sale_artworks

        resolve()
      else
        resolve()

  fetchFairArtworks: =>
    Q.promise (resolve) =>
      if @artwork.related?.__typename is 'RelatedFair'
        artworks = new FilterArtworks []
        artworks.fetch
          error: resolve
          data: @prepareParams fair_id: @artwork.related.id
          success: =>
            @assignRail 'fair_artworks', artworks.toJSON()
            resolve()
      else
        resolve()

  fetchShowArtworks: =>
    Q.promise (resolve) =>
      if @artwork.shows.length
        partner = new Partner id: @artwork.shows[0].partner.id
        show = new PartnerShow id: @artwork.shows[0].id
        show.set partner: partner
        show.related().artworks.fetch
          error: resolve
          success: (artworks) =>
            @assignRail 'show_artworks', artworks.toJSON()
            resolve()
      else
        resolve()

  fetchSimilarArtworks: =>
    Q.promise (resolve) =>
      artworks = new FilterArtworks []
      artworks.fetch
        data: @prepareParams size: 20, gene_id: slugify @artwork.category, artist_id: @artwork.artist.id
        error: resolve
        success: (artworks, response, options) =>
          if artworks.length is 20
            @assignRail 'similar_artworks', artworks.toJSON()
          resolve()

  fetchArtistArtworks: =>
    Q.promise (resolve) =>
      artworks = new FilterArtworks []
      artworks.fetch
        data: @prepareParams artist_id: @artwork.artist.id
        error: resolve
        success: =>
          @assignRail 'artist_artworks', artworks.toJSON()
          resolve()

  fetchPartnerArtworks: =>
    Q.promise (resolve) =>
      artworks = new FilterArtworks []
      artworks.fetch
        data: @prepareParams partner_id: @artwork.partner.id
        error: resolve
        success: =>
          @assignRail 'partner_artworks', artworks.toJSON()
          resolve()
        error: resolve

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
              ... on RelatedFair {
                id
                name
                _id
              }
              ... on RelatedSale {
                id
                name
                start_at
                end_at
                sale_type
                auction_state
                sale_artworks{
                  bidder_positions_count
                  highest_bid{
                    amount_cents
                  }
                  artwork{
                    id
                    image{
                      id
                      url
                      versions
                    }
                  }
                }
              }
            }
            partner{
              id
              default_profile_id
              is_linkable
              name
            }

          }
        }
        '
