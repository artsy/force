masonry = require '../../../../components/artwork_masonry/index.coffee'
_ = require 'underscore'

module.exports =
  masonry: masonry

  filterLayers: (layers) ->
    _.reject layers, (layer) ->
      layer.name is 'For Sale'