{ min, reduce } = require 'underscore'

module.exports = (artworks) ->
  columns = [
    [], [], []
  ]

  valid = ({ image }) ->
    image.thumb.height?

  calculate = (column) ->
    reduce column, (memo, { image }) ->
      memo + image.thumb.height
    , 0

  choose = (image) ->
    min columns, calculate

  artworks.map (artwork) ->
    if valid artwork
      choose artwork.image
        .push artwork

  columns
