_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Item = require '../models/item.coffee'
PageableCollection = require '../components/pageable_collection/index.coffee'

# Collection of Items for an OrderedSet
module.exports = class Items extends PageableCollection
  mode: 'infinite'

  state: pageSize: 20

  url: =>
    "#{sd.API_URL}/api/v1/set/#{@id}/items"

  parseLinks: -> { next: -> } # Appease Backbone Pageable

  model: (attrs, options) =>
    # Add types as needed:
    switch (@item_type or attrs?.item_type)
      when 'OrderedSet'
        OrderedSet = require '../models/ordered_set.coffee'
        new OrderedSet attrs, options
      when 'FeaturedLink'
        FeaturedLink = require '../models/featured_link.coffee'
        new FeaturedLink attrs, options
      when 'Profile'
        Profile = require '../models/profile.coffee'
        new Profile attrs, options
      when 'Gene'
        Gene = require '../models/gene.coffee'
        new Gene attrs, options
      when 'PartnerShow'
        PartnerShow = require '../models/partner_show.coffee'
        new PartnerShow attrs, options
      when 'Artwork'
        Artwork = require '../models/artwork.coffee'
        new Artwork attrs, options
      else
        new Item attrs, options

  initialize: (models, options = {}) ->
    { @id, @item_type } = options
    super
