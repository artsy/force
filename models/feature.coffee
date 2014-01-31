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
{ Image }      = require 'artsy-backbone-mixins'
Artworks      = require '../collections/artworks.coffee'
Backbone      = require 'backbone'
FeaturedLinks = require '../collections/featured_links.coffee'
FeaturedSet   = require './featured_set.coffee'

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
          options.success(finalItems)

        for { set, items } in setItems

          if not items.length or not set.get 'display_on_desktop'
            callback()
            continue

          switch set.get('item_type')

            when 'FeaturedLink'
              set.set
                data: new FeaturedLinks items.map (link) -> link.toJSON()
                type: 'featured links'
              finalItems.push set
              callback()

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
        sort      : 'key'
        owner_type: 'Feature'
        owner_id  : @get 'id'
      success: (sets) ->
        err = null
        callback = _.after sets.length, ->
          return options.error(err) if err
          options.success _.sortBy(finalHashes, (hash) -> hash.set.get 'index')
        sets.each (set, i) ->
          setItems = new Backbone.Collection []
          setItems.url = "#{sd.ARTSY_URL}/api/v1/set/#{set.get 'id'}/items"
          setItems.fetch
            success: (items) ->
              finalHashes.push {
                set  : set.set index: i
                items: switch set.get 'item_type'
                  when 'FeaturedLink' then new FeaturedLinks(items.toJSON())
                  else items
              }
              callback()
            errors: (m, e) -> errs.push(e); callback()
