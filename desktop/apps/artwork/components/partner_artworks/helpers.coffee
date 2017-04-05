masonry = require '../../../../components/artwork_masonry/index'
_ = require 'underscore'

module.exports =
  masonry: (artworks) ->
    masonry _.take _.shuffle(artworks), 10
