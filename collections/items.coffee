_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
Item                = require '../models/item.coffee'
PageableCollection  = require 'backbone-pageable'

# Collection of Items for an OrderedSet
module.exports = class Items extends PageableCollection
  mode: 'infinite'
  queryParams:
    currentPage:  'page'
    pageSize:     'size'

  state:
    pageSize: 20

  parseLinks: -> { next: -> } # Appease Backbone Pageable

  url: => "#{sd.ARTSY_URL}/api/v1/set/#{@id}/items"

  model: (attrs, options) =>
    # Add types as needed:
    switch (attrs.item_type || @item_type)
      when 'FeaturedLink'
        FeaturedLink = require '../models/featured_link.coffee'
        new FeaturedLink attrs, options
      when 'Profile'
        Profile = require '../models/profile.coffee'
        new Profile attrs, options
      when 'Gene'
        Gene = require '../models/gene.coffee'
        new Gene attrs, options
      else
        new Item attrs, options

  initialize: (models, options) ->
    { @id, @item_type } = options
    super
