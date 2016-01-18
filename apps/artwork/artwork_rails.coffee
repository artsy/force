_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
metaphysics = require '../../lib/metaphysics'
{ API_URL } = require('sharify').data

module.exports = class ArtworkRails
  rails: {}
  excludedWorks: {}

  constructor: ({ @id }) ->
    @key = "artwork:#{@id}:rails"

  fetch: ({ @cache } = {}) ->
    Q.promise (resolve, reject) =>
      cache.getHash @key, {}, (err, data) =>
        console.log '@', @
        if data and @cache
          return resolve @rails = data

        Q @fetchArtwork()
        .then (artwork) =>
          console.log 'artwork', artwork
          @rails.artwork = artwork
          resolve @rails
        .catch reject
        .done()

  fetchArtwork: ->
    Q.promise (resolve) =>
      metaphysics
        variables: id: @id
        query: '
          query($id: String!) {
            artwork(id: $id){
              category
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
                }
              }
              partner{
                id
                default_profile_id
                is_linkable
              }

            }
          }
          '
      .then (data) ->
        console.log 'data', data
        resolve data
      .catch (err) ->
        reject err
