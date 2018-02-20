masonry = require '../../../../components/artwork_masonry/index.coffee'
_ = require 'underscore'

module.exports =
  masonry: (artworks) ->
    masonry _.take _.shuffle(artworks), 10
