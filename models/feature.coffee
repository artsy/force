#
# Copy / Paste from microgravity.
# TODO: Port required models, collections, and mixins
#
_             = require 'underscore'
sd            = require('sharify').data
imageMixin    = require './mixins/image.coffee'
#markdownMixin = require './mixins/markdown.coffee'
#setItemsMixin = require './mixins/set_items.coffee'
Artworks      = require '../collections/artworks.coffee'
Backbone      = require 'backbone'
#FeaturedLinks = require '../collections/featured_links.coffee'
#Sale          = require '../models/sale.coffee'
#Videos        = require '../collections/videos.coffee'
{ smartTruncate } = require "../components/util/string.coffee"

module.exports = class Feature extends Backbone.Model

  #_.extend @prototype, markdownMixin
  #_.extend @prototype, setItemsMixin('Feature')
  _.extend @prototype, imageMixin

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/feature"

  hasImage: (version = 'wide') ->
    version in (@get('image_versions') || [])

  metaTitle: ->
    "#{@get('name')} | Artsy"

  metaDescription: (truncate = false) ->
    if truncate
      smartTruncate "#{@get('name')} on Artsy", 200
    else
      "#{@get('name')} on Artsy"

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
  #   * "sale artworks" - Artworks collection
  #   * "featured links" - FeaturedLinks collection
  #   * "auction artworks" - Artworks collection from an auction
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

###
  fetchItems: (options = {}) ->
    @fetchSetItems
      success: (setItems) =>

        # Now that we know how many items need to be mapped, create a callback for those items
        # that need even further data fetched such as a sale's artworks.
        allItemsLen = _.flatten(_.pluck(setItems, 'item')).length
        err = null
        finalItems = []
        callback = _.after allItemsLen, ->
          return options.error(err) if err
          options.success(finalItems)

        for { set, items } in setItems

          if not items.length or not set.get('display_on_mobile')
            callback()
            continue

          switch set.get('item_type')

            when 'Sale'
              # We're going to assume we wouldn't stack multiple sales next to each other
              # because that would be silly. So we'll just use the first item.
              # Set it on the feature for convenience.
              @set sale: (sale = new Sale items.first().toJSON())
              @newItem =
                type    : if sale.get('is_auction') then 'auction artworks' else 'sale artworks'
                index   : set.get('index')
                title   : set.get('name')
              finalItems.push @newItem
              sale.fetchArtworks
                success: (saleArtworks) =>
                  @newItem.data = Artworks.fromSale(saleArtworks)
                  callback()
                error: (e) -> err = e; callback()

            when 'FeaturedLink'
              finalItems.push
                type    : 'featured links'
                data    : new FeaturedLinks(items.map (link) -> link.toJSON())
                index   : set.get('index')
                title   : set.get('name')
              callback()

            when 'Video'
              finalItems.push
                type    : 'video'
                data    : new Videos(items.map (video) -> video.toJSON())
                index   : set.get('index')
                title   : set.get('name')
              callback()

            else
              callback()

      error: options.error
###
