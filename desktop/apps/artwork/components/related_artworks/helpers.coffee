masonry = require '../../../../components/artwork_masonry/index'
_ = require 'underscore'

module.exports =
  masonry: (artworks) -> masonry _.take(artworks, 10)

  filterLayers: (layers) ->
    _.reject layers, (layer) ->
      layer.name is 'For Sale'
