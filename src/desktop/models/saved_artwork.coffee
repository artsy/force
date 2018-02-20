Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class SavedArtwork extends Backbone.Model
  urlRoot: "#{API_URL}/api/v1/collection/saved-artwork/artwork"
