#
# Feature
#
# A feature is a generic model that is used for grouping featued content.
# A feature could be a group of links to posts, shows, or any other Artsy entity.
# Auctions are also features and add the most plumbing to this general purpose set up.
#
# Heavily leveraging @craigspaeth's work from microgravity.
# https://github.com/artsy/microgravity/blob/master/apps/feature
#
_             = require 'underscore'
sd            = require('sharify').data
{ Image }     = require 'artsy-backbone-mixins'
Artworks      = require '../collections/artworks.coffee'
Backbone      = require 'backbone'
FeaturedLinks = require '../collections/featured_links.coffee'
FeaturedSet   = require './featured_set.coffee'
Sale          = require './sale.coffee'

{ smartTruncate }   = require "../components/util/string.coffee"
{ Markdown, Image } = require 'artsy-backbone-mixins'

module.exports = class Feature extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/feature"

  hasImage: (version = 'wide') ->
    version in (@get('image_versions') || [])

  metaTitle: ->
    "#{@get('name')} | Artsy"

  metaDescription: ->
    smartTruncate @get('description')

  shareTitle: (truncate = false) ->
    smartTruncate "#{@get('name')} on Artsy #{sd.ARTSY_URL}#{@href()}", 140

  href: ->
    "/feature/#{@get('id')}"

  # Goes down the rabbit hole of APIs necessary to retrieve the data needed to render a
  # feature. Returns an Array of hashes describing these items such as a collection
  # of artworks from a sale, or a collection of featured links. And example would look like:
  #
  # [
  #   {
  #     type: 'sale artworks',
  #     data: Backbone Collection of artworks
  #   },
  #   {
  #     type: 'featured links',
  #     data: Backbone Collection of featured links
  #   }
  # ]
  #
  # Currently the types are:
  #   * "sale artworks"    Artworks collection
  #   * "featured links"   FeaturedLinks collection
  #   * "auction artworks" Artworks collection from an auction
  #   * "videos"           Like a featured link with videos instead of an images
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  # @return {Array} An array `Set`s

  fetchSets: (options = {}) ->
    @fetchSetsAndItems
      success: (setItems) =>
        # Now that we know how many items need to be mapped, create a callback for those items
        # that need even further data fetched such as a sale's artworks.
        allItemsLen = _.flatten(_.pluck(setItems, 'item')).length
        err = null
        finalItems = []
        callback = _.after allItemsLen, ->
          return options.error(err) if err
          options.success( finalItems.sort (a, b) -> a.get('key')[0] > b.get('key')[0] )

        for { orderedSet, items } in setItems

          if not items.length or not orderedSet.get 'display_on_desktop'
            callback()
            continue

          switch orderedSet.get('item_type')

            when 'FeaturedLink'
              orderedSet.set
                data : new FeaturedLinks items.map (link) -> link.toJSON()
                type : 'featured links'
              finalItems.push orderedSet
              callback()

            when 'Sale'
              # We're going to assume we wouldn't stack multiple sales next to each other
              # because that would be silly. So we'll just use the first item.
              # Set it on the feature for convenience.

              @set sale: (sale = new Sale items.first().toJSON())
              sale.fetchArtworks
                success: _.bind ((orderedSet, saleArtworks) =>
                  orderedSet.set
                    data                : Artworks.fromSale(saleArtworks)
                    display_artist_list : sale.get 'display_artist_list'
                    type                : if sale.get('is_auction') then 'auction artworks' else 'sale artworks'
                  finalItems.push orderedSet
                  callback()
                ), @, orderedSet
                error: (e) -> err = e; callback()

            else
              callback()

      error: options.error

  # Fetches all sets and their items for the mixed-in model. Returns an array of hashes containing
  # the set data and the items from the set.
  #
  # [{
  #   set: new FeaturedSet()
  #   items: new FeaturedLinks()
  # }]
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

  fetchSetsAndItems: (options) ->
    finalHashes = []
    sets = new Backbone.Collection [], { model: FeaturedSet }
    sets.url = "#{sd.ARTSY_URL}/api/v1/sets"
    sets.fetch
      data:
        owner_type: 'Feature'
        owner_id  : @get 'id'
      success: (sets) =>
        err = null
        success = _.after sets.length, ->
          return options.error(err) if err
          options.success finalHashes

        error = (e) ->
          err = e
          success()

        for orderedSet in sets.models
          @fetchSet orderedSet, sets, finalHashes, success, error

  fetchSet: (orderedSet, orderedSets, finalHashes, success, error) ->
    itemType = orderedSet.get('item_type')
    id = orderedSet.get('id')

    if itemType is 'FeaturedLink'
      setItems = new FeaturedLinks []
      method = 'fetchUntilEnd'
    else
      setItems = new Backbone.Collection []
      method = 'fetch'
    setItems.url = "#{sd.ARTSY_URL}/api/v1/set/#{id}/items"
    setItems.id = id
    setItems[method]
      success: (items) ->
        set = orderedSets.get(items.id)
        items = if itemType is 'FeaturedLink' then new FeaturedLinks(items.toJSON()) else items
        finalHashes.push {
          orderedSet : set
          items      : items
        }
        success()
      error: (m, e) -> error(e)
