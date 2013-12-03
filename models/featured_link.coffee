Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'

module.exports = class FeaturedLink extends Backbone.Model
  fetchItems: ->
    items = new Items null, { id: @id }
    items.fetch().then => @set { items: items }
