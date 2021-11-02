sd = require('sharify').data
Item = require '../models/item'
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
        OrderedSet = require '../models/ordered_set'
        new OrderedSet attrs, options
      when 'FeaturedLink'
        FeaturedLink = require '../models/featured_link'
        new FeaturedLink attrs, options
      when 'Profile'
        Profile = require '../models/profile'
        new Profile attrs, options
      when 'Gene'
        Gene = require '../models/gene'
        new Gene attrs, options
      when 'PartnerShow'
        PartnerShow = require '../models/partner_show'
        new PartnerShow attrs, options
      when 'Artwork'
        Artwork = require '../models/artwork'
        new Artwork attrs, options
      else
        new Item attrs, options

  initialize: (models, options = {}) ->
    { @id, @item_type } = options
    super
