masonry = require '../../../../components/artwork_masonry/index.coffee'
_ = require 'underscore'

NUMBER_OF_ARTWORKS = 25

module.exports =
  masonry: (artworks) ->
    masonry _.take _.shuffle(artworks), NUMBER_OF_ARTWORKS
