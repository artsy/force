_ = require 'underscore'
Artworks = require '../collections/artworks.coffee'
{ API_URL } = require('sharify').data

module.exports = class FilterArtworks extends Artworks
  url: "#{API_URL}/api/v1/filter/artworks?aggregations=true"

  parse: (data) ->
    @counts = data.aggregations

    return data.hits