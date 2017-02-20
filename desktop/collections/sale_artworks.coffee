_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class SaleArtworks extends Backbone.Collection
  _.extend @prototype, Fetch(sd.API_URL)

  comparator: 'position'

  url: ->
    "#{sd.API_URL}/api/v1/sale/#{@id}/sale_artworks"

  initialize: (models, options = {}) ->
    { @id } = options
    super
