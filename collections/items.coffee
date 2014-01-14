_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Item      = require '../models/item.coffee'

module.exports = class Items extends Backbone.Collection
  url: -> "#{sd.ARTSY_URL}/api/v1/set/#{@id}/items"

  model: (attrs, options) ->
    heuristicType = (attrs) ->
      return attrs.item_type if attrs.item_type?
      return 'Profile' if _.has attrs, 'cover_image'
      undefined

    switch heuristicType(attrs)
      when 'FeaturedLink'
        FeaturedLink = require '../models/featured_link.coffee'
        new FeaturedLink attrs, options
      when 'Profile'
        Profile = require '../models/profile.coffee'
        new Profile attrs, options
      else
        new Item attrs, options

  initialize: (models, options) ->
    { @id } = options
    super
