_           = require 'underscore'
sd          = require('sharify').data
Backbone    = require 'backbone'
{ Fetch }   = require 'artsy-backbone-mixins'

module.exports = class SaleArtworks extends Backbone.Collection
  _.extend @prototype, Fetch(sd.ARTSY_URL)

  comparator: 'position'

  url: ->
    "#{sd.ARTSY_URL}/api/v1/sale/#{@id}/sale_artworks"

  initialize: (models, options = {}) ->
    { @id } = options
    super
