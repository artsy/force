sd        = require('sharify').data
Backbone  = require 'backbone'
Item      = require '../models/item.coffee'

module.exports = class Items extends Backbone.Collection
  url: -> "#{sd.GRAVITY_URL}/api/v1/set/#{@id}/items"

  model: (attrs, options) ->
    switch attrs.item_type
      when 'FeaturedLink'
        FeaturedLink = require '../models/featured_link.coffee' # Defer loading :\
        new FeaturedLink attrs, options
      else
        new Item attrs, options

  initialize: (models, options) ->
    { @id } = options
    super
