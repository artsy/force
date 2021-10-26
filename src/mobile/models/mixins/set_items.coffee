_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
FeaturedLinks = require '../../collections/featured_links'

module.exports = (ownerType) ->

  # Fetches all sets and their items for the mixed-in model. Returns an array of hashes containing
  # the set data and the items from the set.
  #
  # [{
  #   set: new Backbone.Model({ item_type: 'foo' })
  #   items: new FeaturedLinks()
  # }]
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

  fetchSetItems: (options = {}) ->
    finalHashes = []
    new Backbone.Collection().fetch
      url: "#{sd.API_URL}/api/v1/sets?owner_type=#{ownerType}&owner_id=#{@get 'id'}"
      data:
        display_on_martsy: true
      success: (sets) ->
        err = null
        callback = _.after sets.length, ->
          return options.error(err) if err
          options.success _.sortBy(finalHashes, (hash) -> hash.set.get 'index')
        sets.each (set, i) ->
          if set.get('display_on_martsy')
            new Backbone.Collection().fetch
              url: "#{sd.API_URL}/api/v1/set/#{set.get 'id'}/items"
              data:
                display_on_martsy: true
                size: 50
              success: (items) ->
                finalHashes.push {
                  set: set.set(index: i)
                  items: switch set.get('item_type')
                    when 'FeaturedLink' then new FeaturedLinks(items.toJSON())
                    else items
                }
                callback()
              errors: (m, e) -> errs.push(e); callback()
          else
            callback()
